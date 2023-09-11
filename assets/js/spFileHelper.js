var spFileHelper = spFileHelper || {};


spFileHelper.OnError = function(jqXHR, textStatus, errorThrown, callback) {
        //console.log(error);
        ///$("#divProgress").hide(800);
        ///$(".Message").show(800).find("#divResultat").css("background-color", "red").html(error.responseText);
        //error.responseText
        console.log(textStatus);
        console.log(errorThrown);
        alert(textStatus);
        if (callback) callback();
};

spFileHelper.getName = function(filename, forcename){
        var tFn = filename.split(".")
        var fExt = tFn.splice((tFn.length - 1), 1);
        var fileName = "";
        if (forcename) {
            fileName = escape(forcename.replaceAll(",", "")) + "." + fExt; // + "_" + new Date().getTime()
        } else {
            fileName = escape(tFn.toString().replaceAll(",", "")) + "." + fExt; // + "_" + new Date().getTime()
        }
	return fileName;
};

spFileHelper.getFileBuffer = function(file) {
        var deferred = jQuery.Deferred();
        var reader = new FileReader();
        reader.onloadend = function (e) {
            deferred.resolve(e.target.result);
        }
        reader.onerror = function (e) {
            deferred.reject(e.target.error);
        }
        reader.readAsArrayBuffer(file);
        return deferred.promise();
};


spFileHelper.getFileItem = function(file) {
        console.log(file);
        return jQuery.ajax({
            url: file.ListItemAllFields.__deferred.uri,
            type: "GET",
            dataType: "json",
            headers: {
                Accept: "application/json;odata=verbose"
            }
        });
};


spFileHelper.createFolder = function (libraryName, folderName, callback) {

    var fileCollectionEndpoint = _spPageContextInfo.webServerRelativeUrl + "/_api/web/getfolderbyserverrelativeurl('" + libraryName + "')/folders/add(url=\'" + folderName + "\')";

    return $.ajax({
        url: fileCollectionEndpoint,
        type: "POST",
        headers: {
            "X-RequestDigest": window.top.$("#__REQUESTDIGEST").val(),
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose"
        },
        success: function (data) {
            if (callback) {callback();}
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (callback) {callback();}
        }
    });
    
};


spFileHelper.GetUploadURL = function(Attachment, fileName, libraryName, folderName) {

    var url = "";

        //url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items(" + itemId + ")/AttachmentFiles/ add(FileName='" + fname + "')";

    if (Attachment == true) {
            url = String.format(
                "{0}/_api/web/lists/getbytitle('{1}')/items({2})/AttachmentFiles/add(FileName='{3}')",
                _spPageContextInfo.webServerRelativeUrl, libraryName, folderName, fileName.replaceAll("'", "\'"));

    } else {

        if (folderName) {
            url = String.format(
                "{0}/_api/web/getfolderbyserverrelativeurl('{1}')/files" +
                "/add(overwrite=true, url='{2}')",
                _spPageContextInfo.webServerRelativeUrl, libraryName + "/" + folderName, fileName.replaceAll("'", "\'"));
        } else {
            url = String.format(
                "{0}/_api/web/getfolderbyserverrelativeurl('{1}')/files" +
                "/add(overwrite=true, url='{2}')",
                _spPageContextInfo.webServerRelativeUrl, libraryName, fileName.replaceAll("'", "\'"));


/*                 url = String.format(
                    "{0}/_api/web/getfolderbyserverrelativeurl('{1}')/files" +
                    "/add(overwrite=true, url='{2}')",
                    _spPageContextInfo.webAbsoluteUrl, libraryName, fileName);
    
 */            }
    }

	return url;
};

spFileHelper.PerformUpload = function(url, arrayBuffer, functioncallBack) {
        return jQuery.ajax({
            url: url,
            type: "POST",
            data: arrayBuffer,
            processData: false,
            headers: {
                "Accept": "application/json; odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val() //,
                // "content-length": arrayBuffer.byteLength
            },
            success: function (data) {
                if (functioncallBack) { functioncallBack(data); }
            },
            error: function (jqXHR, textStatus, errorThrown) {           
                spFileHelper.OnError(jqXHR, textStatus, errorThrown);
            }
        });
};

spFileHelper.PerformUploadOld = function(url, arrayBuffer) {
    return jQuery.ajax({
        url: url,
        type: "POST",
        data: arrayBuffer,
        processData: false,
        headers: {
            "Accept": "application/json; odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val() //,
            // "content-length": arrayBuffer.byteLength
        }
    });
};

spFileHelper.updateDocItemFields = function(item, fieldtab, libraryName, callback) {

        var clientContext = SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle(libraryName);
        var oListItem = oList.getItemById(item.Id);

	$.each(fieldtab, function (index, project) {
//alert(fieldtab[index].FieldName);
		oListItem.set_item(fieldtab[index].FieldName, fieldtab[index].FieldValue);
	});
        //oListItem.set_item('Title', tFN[0]);
        oListItem.update();
        clientContext.executeQueryAsync(function (s, a) {
            if (callback) { callback(); }
        }, function (sender, arg) {
            console.log(sender);
            console.log(arg)
            //onError("Une erreur est suvenue lors de la mise a jour")
            if (callback) { callback(); }

        });
};


spFileHelper.sendUploadRequest = function(Attachment, file, libraryName, folderName, TFields, callback) {
    var fileName = ""; 
    fileName = spFileHelper.getName(file.name, file.forcename);
    if (file.forcename) {} else { }
    var URL = spFileHelper.GetUploadURL(Attachment, fileName, libraryName, folderName);
    console.log("URL");
    console.log(URL);
    var getFile = spFileHelper.getFileBuffer(file);

    getFile.done(function (arrayBuffer) {
        // Add the file to SharePoint
        var addFile = spFileHelper.PerformUpload(URL, arrayBuffer, function(data){
            console.log("Upload Done");
            if (Attachment != true) {
                var Docfile = spFileHelper.getFileItem(data.d);
                Docfile.done(function (data) {
                    if (file.Fields) { 
                        spFileHelper.updateDocItemFields(data.d, file.Fields, libraryName, function(){
                            if (callback) { callback(); }
                        }); 
                    } else if (TFields) {
                        spFileHelper.updateDocItemFields(data.d, TFields, libraryName, function(){
                            if (callback) { callback(); }
                        }); 
                    } else {
                        if (callback) { callback(); }
                    }
                });
            } else {
                if (callback) { callback(); }
            }

        });

        /*
        addFile.done(function (data, status, xhr) {
            console.log("Upload Done");
            if (Attachment != true) {
                var Docfile = spFileHelper.getFileItem(data.d);
                Docfile.done(function (data) {
                    if (file.Fields) { 
                        spFileHelper.updateDocItemFields(data.d, file.Fields, libraryName, function(){
                            if (callback) { callback(); }
                        }); 
                    } else if (TFields) {
                        spFileHelper.updateDocItemFields(data.d, TFields, libraryName, function(){
                            if (callback) { callback(); }
                        }); 
                    } else {
                        if (callback) { callback(); }
                    }
                });
            } else {
                if (callback) { callback(); }
            }
        });
        addFile.fail(callback());
        */
    });
    getFile.fail(function() { console.log("getFile failed"); callback()});
};

spFileHelper.uploadDocuments = function(FilesTable, AsAttachment, libraryName, folderName, TFields, callback) {
    var TFiles = FilesTable;
    console.log("TFiles in SPFile");
    console.log(FilesTable);
    console.log(TFiles.length);
    if (TFiles.length > 0) {
        var File = TFiles[0];
        if (AsAttachment == true) {
            spFileHelper.sendUploadRequest(true, File, libraryName, folderName, TFields, function() {
                console.log("On reprend");
                TFiles.shift();
                spFileHelper.uploadDocuments(TFiles, AsAttachment, libraryName, folderName, TFields, callback);
            });		
        } else {
            if (folderName) {
                spFileHelper.createFolder(libraryName, folderName, function () {
                    spFileHelper.sendUploadRequest(false, File, libraryName, folderName, TFields, function() {
                        TFiles.shift();
                        spFileHelper.uploadDocuments(TFiles, AsAttachment, libraryName, folderName, TFields, callback);
                    });			
                });
            } else {
                spFileHelper.sendUploadRequest(false, File, libraryName, folderName, TFields, function() {
                    TFiles.shift();
                    spFileHelper.uploadDocuments(TFiles, AsAttachment, libraryName, folderName, TFields, callback);
                });			
            }
        }
    } else {
        console.log("TFiles.length fini");
        if (callback) { callback(); }
    }
};


spFileHelper.sendUploadRequestOld = function(Attachment, tFiles, libraryName, folderName, callback, TFields) {

    //console.log(tFiles);
    
    
        if (tFiles.length > 0) {
            var file = tFiles[0];
            console.log(file);
            var fileName = ""; 
            fileName = spFileHelper.getName(file.name, file.forcename);
            if (file.forcename) {} else { }
            var URL = spFileHelper.GetUploadURL(Attachment, fileName, libraryName, folderName);
            var getFile = spFileHelper.getFileBuffer(file);
    
            getFile.done(function (arrayBuffer) {
                // Add the file to SharePoint
                var addFile = spFileHelper.PerformUpload(URL, arrayBuffer);
                addFile.done(function (data, status, xhr) {
                    if (Attachment != true) {
                        var Docfile = spFileHelper.getFileItem(data.d);
                        Docfile.done(function (data) {
                            if (file.Fields) { 
                                spFileHelper.updateDocItemFields(data.d, file.Fields, libraryName, function(){
                                    tFiles.shift();
                                    spFileHelper.sendUploadRequest(false, tFiles, libraryName, folderName, callback, TFields);
                                }); 
                            } else if (TFields) {
                                spFileHelper.updateDocItemFields(data.d, TFields, libraryName, function(){
                                    tFiles.shift();
                                    spFileHelper.sendUploadRequest(false, tFiles, libraryName, folderName, callback, TFields);
                                }); 
                            } else {
                                tFiles.shift();
                                spFileHelper.sendUploadRequest(false, tFiles, libraryName, folderName, callback, TFields);
                            }
                        });
                    } else {
                        console.log(tFiles)
                        tFiles.shift();
                        spFileHelper.sendUploadRequest(true, tFiles, libraryName, folderName, callback, TFields);
                    }
                });
                addFile.fail(callback());
            });
            getFile.fail(callback());
    
    
        } else {
            if (callback) { callback(); }
        }
};
spFileHelper.uploadDocumentsOld = function(FilesTable, AsAttachment, libraryName, folderName, TFields, callback) {
    var TFiles = FilesTable;

    console.log("TFiles.length");
    console.log(TFiles.length);

    if (TFiles.length > 0) {
        if (AsAttachment == true) {
            spFileHelper.sendUploadRequest(true, TFiles, libraryName, folderName, callback, TFields);		
        } else {
            if (folderName) {
                spFileHelper.createFolder(libraryName, folderName, function () {
                    spFileHelper.sendUploadRequest(false, TFiles, libraryName, folderName, callback, TFields);		
                });
            }   
            else {
                spFileHelper.sendUploadRequest(false, TFiles, libraryName, folderName, callback, TFields);		
            }
        }
    } else {
        if (callback) { callback(); }
    }
};
    


spFileHelper.getAttachmentFiles = function(listName,itemID,callBack) {
    var strFichier = '';
    $.ajax({
        url: _spPageContextInfo.webServerRelativeUrl + "/_api/web/lists/getbytitle('" + listName + "')/items(" + itemID + ")/AttachmentFiles/",
        method: "GET",
        headers: {
            "ACCEPT": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose"
        },
        success: function (data) {
            if (callBack) {
                callBack(data);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {           
            spFileHelper.OnError(jqXHR, textStatus, errorThrown);
        }
    });
};

spFileHelper.getDocuments = function (listName, folder, query, callBack) {
    var url = _spPageContextInfo.webServerRelativeUrl + "/_api/web/lists/getByTitle('" + listName + "')/items?$select=*,Author/Id,Author/Title" + (query ? query : "") + "&$expand=Author,File,ModifiedBy";

    if (folder) {
        url = _spPageContextInfo.webServerRelativeUrl + "/_api/web/getfolderbyserverrelativeurl('" + listName + "/" + folder + "')/Files?" + (query ? query : "") + "&$expand=Author,ListItemAllFields,ModifiedBy";
    }

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        headers: { "accept": "application/json;odata=verbose"},
        success: function (data) {
           if (callBack) callBack(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            spFileHelper.OnError(jqXHR, textStatus, errorThrown);
        }
    });
};


spFileHelper.GetDocStream = function(SourceFileURL, FileName, callBack) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {

            var fName = (FileName ? FileName : ""); //.replaceAll(" ", "");
            var myBlob = new Blob([xhr.response]); //, { type: 'Application/pdf', filename: FileName, name: FileName }

            function blobToFile(theBlob, fileName) {
                //A Blob() is almost a File() - it's just missing the two properties below which we will add
                //theBlob.lastModifiedDate = new Date();
                theBlob.name = fileName;
                theBlob.filename = fileName;
                return theBlob;
            }
            var fileOfBlob = new File([myBlob], fName);
            var myFile = blobToFile(myBlob, FileName);

            if (callBack) callBack(myFile);
        }
    };
    xhr.open('GET', SourceFileURL); // 'https://sce.cryptoneoplatforms.com/ansut/AnsutEConseil/resources/signature/getDocumentFile/f40076bd-c1f0-479e-a49c-ac4635f3c02a_Feuilletage3.pdf');
    //xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    //xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({"path": "/filetest.pdf"}));
    xhr.send();

}

spFileHelper.UploadStream = function(DestURL, Datas, FileName, callBack) {

    var formData = new FormData();

    //formData.append('File-Name', FileName);
    //formData.AdobeAccessend('FileName', AdobeAccess.FileName);
    //formData.append('Mime-Type', 'Application/pdf');
    //formData.AdobeAccessend('name',  AdobeAccess.FileName);
    //formData.AdobeAccessend('filename', AdobeAccess.FileName);
    //formData.append('File', Datas);//
    //formData.append(Datas);//

    var xhr = new XMLHttpRequest();
    //xhr.responseType = 'blob';
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 201) {
            //var TID = JSON.parse(xhr.response).transientDocumentId
            //console.log(TID);
            if (callBack) callBack(TID);

            /*
            var myBlob = new Blob([xhr.response]);
            var FileName = AdobeAccess.FileName; //.replaceAll(" ", "");

            function blobToFile(theBlob, fileName) {
                //A Blob() is almost a File() - it's just missing the two properties below which we will add
                theBlob.lastModifiedDate = new Date();
                theBlob.name = fileName;
                //theBlob.filename = fileName;
                return theBlob;
            }
            var myFile = blobToFile(myBlob, FileName);
            */
        }
    };
    //var URL = AdobeAccess.API_ACCESS + "api/rest/v6/transientDocuments";
    //console.log(URL);
    xhr.open('POST', DestURL); //
    xhr.setRequestHeader('Accept', 'application/json, text/javascript, */*');
    xhr.setRequestHeader("X-RequestDigest", $("#__REQUESTDIGEST").val()); //,

    //xhr.setRequestHeader('Authorization', 'Bearer ' + AdobeAccess.TOKEN);
    //xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=---' + 'SenyniumX');
    //xhr.setRequestHeader('x-api-user', 'email:' + AdobeAccess.SenderMail); // i.s.traore@afdb.org'
    //xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({"path": "/filetest.pdf"}));
    //xhr.setBody('{"fileName":"' + AdobeAccess.FileName + '","file":"'+testFileContent+'"}');
    //xhr.send(formData);
    xhr.send(Datas);
    
};

spFileHelper.deleteFile = function(Attachment, listname, foldername, filename, CallBack) {

var URL = "";

if (Attachment == true) {
	URL = _spPageContextInfo.webServerRelativeUrl + "/_api/lists/getByTitle('" + listname + "')/getItemById(" + foldername + ")/AttachmentFiles/getByFileName('" + filename + "')"
} else {
	if (foldername){
		URL = _spPageContextInfo.webServerRelativeUrl + "/_api/web/GetFileByServerRelativeUrl('" + listname + "/" + foldername + "/" + filename + "')";
	} else {
		URL = _spPageContextInfo.webServerRelativeUrl + "/_api/web/GetFileByServerRelativeUrl('" + listname + "/" + filename + "')";
	}
}
 
   return $.ajax({
        url: URL,
        method: 'POST',
        contentType: 'application/json;odata=verbose',
        headers: {
            'X-RequestDigest': $('#__REQUESTDIGEST').val(),
            'X-HTTP-Method': 'DELETE',
            'Accept': 'application/json;odata=verbose'
        },
        success: function (data) {
            CallBack();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            spFileHelper.OnError(jqXHR, textStatus, errorThrown);
	}
    });
};



