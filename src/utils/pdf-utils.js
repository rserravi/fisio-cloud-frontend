import {jsPDF} from "jspdf";

export const htmlToPdfConverter = (html)=>{
    var doc = new jsPDF('p', 'pt', 'a4', true);
    //var stringHtml = html;
    var head = '<head>><title>Consent</title><style rel="stylesheet" type="text/css"> #consent ul { width: 560px; text-align: left; padding-left:1em } #consent li { list-style-type: disc; padding-left:1em }</style></head><body>'
    var stringHtml = head + "<div id='consent' style='font-size:8px; width:580px; padding: 05px 15px;'>"+html+"</div></body></html>";
    doc.setFontSize(10);
    //doc.text('Title', 15, 15);
    doc.html(stringHtml, {
        callback: function (doc) {
          doc.save();
        },
        margin:2
     });
    window.open(doc.output('bloburl'), '_blank');

}