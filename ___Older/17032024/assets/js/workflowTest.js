const ACTIV_WORKFLOW = {
  processus: [
    {
      item: "ABSENCE",
      step: [
        {
          id: "ABS#1",
          value: "VALIDATION DU SUPERIEUR HIERARCHIQUE ",
          actors: [
            {
              type: "USER",
              value: "#N1",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "ABS#2",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "ABS#2",
          value: "VALIDATION DU SUPERIEUR DIRECTEUR ",
          actors: [
            {
              type: "USER",
              value: "#DIRECTEUR",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "ABS#3",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "ABS#3",
          value: "VALIDATION RESPONSABLE ADMINISTRATIF DU PERSONNEL",
          actors: [
            {
              type: "GROUP",
              value: "GroupGAP",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "ABS#4",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "ABS#4",
          value: "VALIDATION DU DRHO",
          actors: [
            {
              type: "GROUP",
              value: "GroupDRHO",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "ABS#5",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
      ],
    },

    {
      item: "CONGE",
      step: [
        {
          id: "CNG#1",
          value: "VALIDATION DU SUPERIEUR HIERARCHIQUE ",
          actors: [
            {
              type: "USER",
              value: "#N1",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "CNG#2",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "CNG#2",
          value: "VALIDATION DU DIRECTEUR ",
          actors: [
            {
              type: "USER",
              value: "#DIRECTEUR",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "CNG#3",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "CNG#3",
          value: "VALIDATION DE LA RESPONSABLE ADMINISTRATIF DU PERSONNEL",
          actors: [
            {
              type: "GROUP",
              value: "GroupGAP",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "CNG#4",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "CNG#4",
          value: "VALIDATION DU DRHO",
          actors: [
            {
              type: "GROUP",
              value: "GroupDRHO",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "CNG#5",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
      ],
    },

    {
      item: "GADGET",
      step: [
        {
          id: "GDT#1",
          value: "VALIDATION DU SUPERIEUR HIERARCHIQUE ",
          actors: [
            {
              type: "USER",
              value: "#N1",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "GDT#2",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "GDT#2",
          value: "VALIDATION DU CHEF DESERVICE COMMUNICATION ",
          actors: [
            {
              type: "GROUP",
              value: "GroupCSC",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "GDT#3",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "GDT#3",
          value: "VALIDATION DU SOUS DIRECTEUR COMMUNICATION",
          actors: [
            {
              type: "GROUP",
              value: "GroupSDC",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "GDT#4",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "GDT#4",
          value: "VALIDATION DU DIRECTEUR MARKETING COMMUNICATION DIGITALE",
          actors: [
            {
              type: "GROUP",
              value: "GroupDMCD",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "GDT#5",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "GDT#5",
          value: "VALIDATION DU GESTIONNAIRE DU STOCK MARKETING",
          actors: [
            {
              type: "GROUP",
              value: "GroupGSM",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "GDT#5",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
      ],
    },

    {
      item: "MATERIEL",
      step: [
        {
          id: "MTRL#1",
          value: "VALIDATION DU RESPONSABLE HIERARCHIQUE ",
          actors: [
            {
              type: "USER",
              value: "#N1",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "MTRL#2",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "MTRL#2",
          value: "VALIDATION DU GESTIONNAIRE DE DIVISION INFRASTRUCTURE ",
          actors: [
            {
              type: "GROUP",
              value: "GroupGDI",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "MTRL#3",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "MTRL#3",
          value: "VALIDATION DU CHEF DE DIVISION INFRASTRUCTURE",
          actors: [
            {
              type: "GROUP",
              value: "GroupCDI",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "MTRL#4",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "MTRL#4",
          value: "VALIDATION DU DIRECTEUR SYSTEME INFORMATIQUE",
          actors: [
            {
              type: "GROUP",
              value: "GroupDSI",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "MTRL#5",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "MTRL#5",
          value: "VALIDATION DU GESTIONNAIRE DU STOCK",
          actors: [
            {
              type: "GROUP",
              value: "GroupGSI",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "MTRL#5",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
      ],
    },

    {
      item: "VEHICULE",
      step: [
        {
          id: "VHCL#1",
          value: "VALIDATION DU RESPONSABLE HIERARCHIQUE ",
          actors: [
            {
              type: "USER",
              value: "#N1",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "VHCL#2",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "VHCL#2",
          value: "VALIDATION DU GESTIONNAIRE PARC AUTOMOBILE ",
          actors: [
            {
              type: "GROUP",
              value: "GroupGPA",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "VHCL#3",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "VHCL#3",
          value: "VALIDATION DU CHEF DE DIVISION ACHAT ET LOGISTIQUE",
          actors: [
            {
              type: "GROUP",
              value: "GroupCDAL",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "VHCL#4",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "VHCL#4",
          value: "VALIDATION DU DAF",
          actors: [
            {
              type: "GROUP",
              value: "GroupDAF",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "VHCL#5",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "VHCL#5",
          value: "VALIDATION DU GESTIONNAIRE PARC AUTOMOBILE ",
          actors: [
            {
              type: "GROUP",
              value: "GroupGPA",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "VHCL#3",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
      ],
    },

    {
      item: "SORTIECAISSE",
      step: [
        {
          id: "SRTCSE#1",
          value: "VALIDATION DU RESPONSABLE HIERARCHIQUE ",
          actors: [
            {
              type: "USER",
              value: "#N1",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "SRTCSE#2",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "SRTCSE#2",
          value: "VALIDATION DU DIRECTEUR ",
          actors: [
            {
              type: "USER",
              value: "#DIRECTEUR",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "SRTCSE#3",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "SRTCSE#3",
          value: "VALIDATION DU CONTROLE GENERAL",
          actors: [
            {
              type: "GROUP",
              value: "GroupCI",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "SRTCSE#4",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "SRTCSE#4",
          value: "VALIDATION DE LA DAF",
          actors: [
            {
              type: "GROUP",
              value: "GroupDAF",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "SRTCSE#5",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },

        {
          id: "SRTCSE#5",
          value: "VALIDATION DU SERVICE ENGAGEMENT ",
          actors: [
            {
              type: "GROUP",
              value: "GroupSE",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "SRTCSE#6",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
      ],
    },

    {
      item: "REGULARISATIONSORTIECAISSE",
      step: [
        {
          id: "RGLSRTCSE#1",
          value: "VALIDATION DU RESPONSABLE HIERARCHIQUE ",
          actors: [
            {
              type: "USER",
              value: "#N1",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "RGLSRTCSE#2",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "RGLSRTCSE#2",
          value: "VALIDATION DU DIRECTEUR ",
          actors: [
            {
              type: "USER",
              value: "#DIRECTEUR",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "RGLSRTCSE#3",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "RGLSRTCSE#2",
          value: "VALIDATION DU CONTROLE GENERAL ",
          actors: [
            {
              type: "GROUP",
              value: "GroupCI",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "RGLSRTCSE#3",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "RGLSRTCSE#4",
          value: "VALIDATION DU SERVICE ENGAGEMENT",
          actors: [
            {
              type: "GROUP",
              value: "GroupSE",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "RGLSRTCSE#5",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
      ],
    },

    {
      item: "MISSION",
      step: [
        {
          id: "MSN#1",
          value: "VALIDATION DU RESPONSABLE HIERARCHIQUE ",
          actors: [
            {
              type: "USER",
              value: "#N1",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "MSN#2",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "MSN#2",
          value: "VALIDATION DU DIRECTEUR ",
          actors: [
            {
              type: "USER",
              value: "#DIRECTEUR",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "MSN#3",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "MSN#3",
          value: "VALIDATION DU CONTROLE GENERAL",
          actors: [
            {
              type: "GROUP",
              value: "GroupCI",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "MSN#4",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "MSN#4",
          value: "VALIDATION DE LA DFC ",
          actors: [
            {
              type: "GROUP",
              value: "GroupDFC",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "MSN#5",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "MSN#5",
          value: "VALIDATION DE LA DRHO",
          actors: [
            {
              type: "GROUP",
              value: "GroupDRHO",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "MSN#6",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "MSN#6",
          value: "VALIDATION DU SERVICE ENGAGEMENT ",
          actors: [
            {
              type: "GROUP",
              value: "GroupSE",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "MSN#7",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
      ],
    },

    {
      item: "REGULARISATIONFRAISMISSION",
      step: [
        {
          id: "REGFMN#1",
          value: "VALIDATION DU RESPONSABLE HIERARCHIQUE ",
          actors: [
            {
              type: "USER",
              value: "#N1",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "REGFMN#2",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "REGFMN#2",
          value: "VALIDATION DU RESPONSABLE DIRECTEUR",
          actors: [
            {
              type: "USER",
              value: "#DIRECTEUR",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "REGFMN#3",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "REGFMN#3",
          value: "VALIDATION DU CONTROLE GENERAL ",
          actors: [
            {
              type: "GROUP",
              value: "GroupCI",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "REGFMN#4",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "REGFMN#4",
          value: "VALIDATION DU SERVICE ENGAGEMENT",
          actors: [
            {
              type: "GROUP",
              value: "GroupSE",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "REGFMN#5",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
      ],
    },

    {
      item: "REPRISE",
      step: [
        {
          id: "REP#1",
          value: "VALIDATION DU RESPONSABLE HIERARCHIQUE ",
          actors: [
            {
              type: "USER",
              value: "#N1",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "REP#2",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "REP#2",
          value: "VALIDATION DU SUPERIEUR DIRECTEUR ",
          actors: [
            {
              type: "USER",
              value: "#DIRECTEUR",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "REP#3",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "REP#3",
          value: "VALIDATION DU RESPONSABLE ADMINISTRATIF DU PERSONNEL",
          actors: [
            {
              type: "GROUP",
              value: "GroupGAP",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "REP#4",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "REP#4",
          value: "VALIDATION DE LA DRHO",
          actors: [
            {
              type: "GROUP",
              value: "GroupDRHO",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "REP#5",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
      ],
    },

    {
      item: "REGULARISATIONVEHICULE",
      step: [
        {
          id: "REGVEH#1",
          value: "VALIDATION DU RESPONSABLE HIERARCHIQUE ",
          actors: [
            {
              type: "USER",
              value: "#N1",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "REGVEH#2",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "REGVEH#2",
          value: "VALIDATION DU GESTIONNAIRE DE PARC AUTOMOBILE",
          actors: [
            {
              type: "GROUP",
              value: "GroupGAP",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "REGVEH#3",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "REGVEH#3",
          value: "VALIDATION DU CHEF DE DIVISION ACHATS ET LOGISTIQUE",
          actors: [
            {
              type: "GROUP",
              value: "GroupCDAL",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "REGVEH#4",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
      ],
    },


    {
      item: "SORTIECAISSESUP500K",
      step: [
        {
          id: "SRTCSES5#1",
          value: "VALIDATION DU RESPONSABLE HIERARCHIQUE ",
          actors: [
            {
              type: "USER",
              value: "#N1",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "SRTCSES5#2",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "SRTCSES5#2",
          value: "VALIDATION DU DIRECTEUR ",
          actors: [
            {
              type: "USER",
              value: "#DIRECTEUR",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "SRTCSES5#3",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "SRTCSES5#3",
          value: "VALIDATION DU CONTROLE GENERAL",
          actors: [
            {
              type: "GROUP",
              value: "GroupCI",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "SRTCSES5#4",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "SRTCSES5#4",
          value: "VALIDATION DE LA DAF",
          actors: [
            {
              type: "GROUP",
              value: "GroupDAF",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "SRTCSES5#5",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "SRTCSES5#5",
          value: "VALIDATION DU DG",
          actors: [
            {
              type: "GROUP",
              value: "GroupDG",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "SRTCSES5#6",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "SRTCSES5#6",
          value: "VALIDATION DU SERVICE ENGAGEMENT ",
          actors: [
            {
              type: "GROUP",
              value: "GroupSE",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "SRTCSES5#6",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
      ],
    },

    {
      item: "MISSIONSUP500K",
      step: [
        {
          id: "MSNS5#1",
          value: "VALIDATION DU RESPONSABLE HIERARCHIQUE ",
          actors: [
            {
              type: "USER",
              value: "#N1",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "MSNS5#2",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "MSNS5#2",
          value: "VALIDATION DU DIRECTEUR ",
          actors: [
            {
              type: "USER",
              value: "#DIRECTEUR",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "MSNS5#3",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "MSNS5#3",
          value: "VALIDATION DU CONTROLE GENERAL",
          actors: [
            {
              type: "GROUP",
              value: "GroupCI",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "MSNS5#4",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "MSNS5#4",
          value: "VALIDATION DE LA DFC ",
          actors: [
            {
              type: "GROUP",
              value: "GroupDFC",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "MSNS5#5",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "MSNS5#5",
          value: "VALIDATION DE LA DRHO",
          actors: [
            {
              type: "GROUP",
              value: "GroupDRHO",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "MSNS5#6",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "MSNS5#6",
          value: "VALIDATION DU DIRECTEUR GENERAL ",
          actors: [
            {
              type: "GROUP",
              value: "GroupDG",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "MSNS5#7",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
        {
          id: "MSNS5#7",
          value: "VALIDATION DU SERVICE ENGAGEMENT ",
          actors: [
            {
              type: "GROUP",
              value: "GroupSE",
            },
          ],
          copies: [],
          buttons: [
            {
              text: "APPROUVER",
              icon: "fa fa-check",
              url: "",
              next_step: "MSNS5#8",
            },
            {
              text: "DEMANDER UNE MODIFICATION",
              icon: "fa fa-mail-reply",
              url: "",
              next_step: "0#",
            },
            {
              text: "REJETER",
              icon: "fa fa-ban",
              url: "",
              next_step: "##",
            },
          ],
        },
      ],
    },


  ],
};

