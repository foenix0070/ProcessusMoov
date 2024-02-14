const ACTIV_WORKFLOW = {
  processus: [
    {
      item: "ABSENCE",
      step: [
        {
          id: "ABS#1",
          value: "Validation du supérieur hiérarchique ",
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
          value: "Validation du supérieur directeur ",
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
          value: "Validation de la section GESTION ADMINISTRATIVE DU PERSONNEL",
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
          value: "Validation du DRHO",
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
          id: "ABS#1",
          value: "Validation du supérieur hiérarchique ",
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
          value: "Validation du supérieur directeur ",
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
          value: "Validation de la section GESTION ADMINISTRATIVE DU PERSONNEL",
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
          value: "Validation du DRHO",
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
      item: "GADGET",
      step: [
        {
          id: "CNG#1",
          value: "Validation du supérieur hiérarchique ",
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
          value: "Validation du gestionnaire de division communication ",
          actors: [
            {
              type: "GROUP",
              value: "GroupGDC",
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
          value: "Validation du sous directeur communication",
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
          value: "Validation du directeur marketing communication digitale",
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
        {
          id: "CNG#5",
          value: "Validation du gestionnaire du stock marketing",
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
      item: "MATERIEL",
      step: [
        {
          id: "MTRL#1",
          value: "Validation du responsable hiérarchique ",
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
          value: "Validation du gestionnaire de division infrastructure ",
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
          value: "Validation du chef de division infrastructure",
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
          value: "Validation du directeur système informatique",
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
          value: "Validation du gestionnaire du stock",
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
          value: "Validation du responsable hiérarchique ",
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
          value: "Validation du gestionnaire park automobile ",
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
          value: "Validation du chef de division achat et logistique",
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
          value: "Validation du DAF",
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
          value: "Validation du gestionnaire ",
          actors: [
            {
              type: "GROUP",
              value: "GroupGV",
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
      ],
    },
  ],
};
