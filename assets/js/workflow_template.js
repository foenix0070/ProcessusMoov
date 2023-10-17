var ACTIV_NAMESPACE = null;

const ACTIV_WORKFLOW = {
  processus: [
    {
      item: "ABSENCE",
      step: [
        {
          id: "ABS#1",
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "ACTION",
          action_url: "/pages/tache/absnc_sgap.html",
          value: "VALIDATION DE LA SECTION GESTION ADMINISTRATIVE DU PERSONNEL",

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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
          value: "VALIDATION DU  DIRECTEUR ",
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
          action_type: "ACTION",
          action_url: "/pages/tache/conge_sgap.html",
          value: "VALIDATION DE LA SECTION GESTION ADMINISTRATIVE DU PERSONNEL",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
          value: "VALIDATION DU GESTIONNAIRE DE LA DIVISION COMMUNICATION ",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
          value: "VALIDATION DU GESTIONNAIRE PARK AUTOMOBILE ",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
      ],
    },
    {
      item: "SORTIECAISSE",
      step: [
        {
          id: "SRTCSE#1",
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
      ],
    },
    {
      item: "REGULARISATIONSORTIECAISSE",
      step: [
        {
          id: "RGLSRTCSE#1",
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
          value: "VALIDATION DU CONTROLE INTERNE ",
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
          id: "RGLSRTCSE#3",
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
              next_step: "RGLSRTCSE#4",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
      ],
    },
    {
      item: "REGULARISATIONFRAISMISSION",
      step: [
        {
          id: "REGFMN#1",
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
          value: "VALIDATION DU CONTROLE INTERNE ",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
      ],
    },
  ],
};

const ACTIV_WORKFLOW1 = {
  processus: [
    {
      item: "MISSION",
      step: [
        {
          id: "MSN#1",
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
      ],
    },
  ],
};

const ACTIV_WORKFLOW2 = {
  processus: [
    {
      item: "SORTIECAISSE",
      step: [
        {
          id: "SRTCSE#1",
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          id: "SRTCSE#5",
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
      ],
    },
  ],
};

const ACTIV_WORKFLOWREP = {
  processus: [
    {
      item: "REPRISE",
      step: [
        {
          id: "REP#1",
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
          value: "VALIDATION DE LA GAP ",
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
          action_type: "VALIDATION",
          action_url:  "/pages/tache/validation.html",
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
  ],
};
