import {useEffect, useState } from 'react';
import {} from "react-router-dom";


function EditDesign () {

  const [templates,setTemplates] = useState({
    "counters": {
      "u_column": {
        "type": "Number"
      },
      "u_row": {
        "type": "Number"
      }
    },
    "body": {
      "rows": {
        "type": [
          "Mixed"
        ]
      },
      "values": {
        "textColor": {
          "type": "Date"
        },
        "backgroundColor": {
          "type": "String"
        },
        "backgroundImage": {
          "url": {
            "type": "String"
          },
          "fullWidth": {
            "type": "Boolean"
          },
          "repeat": {
            "type": "Boolean"
          },
          "center": {
            "type": "Boolean"
          },
          "cover": {
            "type": "Boolean"
          }
        },
        "contentWidth": {
          "type": "String"
        },
        "contentAlign": {
          "type": "String"
        },
        "fontFamily": {
          "label": {
            "type": "String"
          },
          "value": {
            "type": "String"
          }
        },
        "preheaderText": {
          "type": "String"
        },
        "linkStyle": {
          "body": {
            "type": "Boolean"
          },
          "linkColor": {
            "type": "String"
          },
          "linkHoverColor": {
            "type": "String"
          },
          "linkUnderline": {
            "type": "Boolean"
          },
          "linkHoverUnderline": {
            "type": "Boolean"
          }
        },
        "_meta": {
          "htmlID": {
            "type": "String"
          },
          "htmlClassNames": {
            "type": "String"
          }
        }
      }
    },
    "schemaVersion": {
      "type": "Number"
    }
  });

  useEffect(() => {
      fetch("/")
        .then(jsonRes  => setTemplates(jsonRes));
      },[]);

      return templates[0];
  }


  export default EditDesign;
