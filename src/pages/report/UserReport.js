import React, {useEffect, useState} from "react";
import {Button} from "antd";
import * as pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

function UserReport() {

    const SERVER = "http://192.168.5.227:8080";
    const VER = "/api/v1"

    const [list, setList] = useState([]);
    const content = [];

    useEffect(() => {
        const getAllTickets = async () => {
            try {
                const auth = localStorage.getItem("token");
                const response = await fetch(SERVER + VER + "/app/reports/location_user", {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + auth,
                        "Content-Type": "application/json"
                    },
                });
                await response.json()
                    .then(date => {
                        setList(date);
                    })
            } catch (err) {
                console.log(err);
            }
        };
        getAllTickets();
    }, []);

    var docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'portrait',

        content: [content],

        styles: {
            header: {
                fontSize: 18,
                bold: true
            }
        }
    };

    function buildTableBody(data, columns) {
        var body = [];

        body.push(['Фамилия','Имя','Отчестов']);

        data.forEach(function (row) {
            var dataRow = [];

            columns.forEach(function (column) {
                if (row[column] != null) {
                    dataRow.push(row[column].toString());
                } else {
                    dataRow.push('');
                }

            })

            body.push(dataRow);
        });

        return body;
    }

    function table(data, columns) {
        return {
            table: {
                headerRows: 1,
                widths: [100, 100, 100],
                body: buildTableBody(data, columns)
            }
        };
    }

    function f() {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;

        list.forEach((item, i) => {
            content.push({text: 'Кабинет: ' + item.name+'\n\n', style: 'header'})

            content.push(table(item.user, ['lastName', 'firstName', 'middleNames']))
            if (i < list.length - 1) {
                content.push({text: '', pageBreak: 'after'})
            }
        })

        pdfMake.createPdf(docDefinition).getDataUrl(function (outDoc) {
            document.getElementById('pdfV').src = outDoc;
        });
    }

    return (
        <>
            <iframe id="pdfV" style={{height: '100%', width: '100%'}}>555</iframe>
            <Button onClick={() => f()}>555</Button>
        </>
    );
};

export default UserReport;