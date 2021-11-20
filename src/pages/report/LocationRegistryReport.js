import React, {useEffect, useState} from "react";
import {Button} from "antd";
import * as pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import get from "lodash.get";

function LocationRegistryReport() {

    const SERVER = "http://localhost:8080";
    const VER = "/api/v1"

    const [list, setList] = useState([]);
    const content = [];

    useEffect(() => {
        const getAllTickets = async () => {
            try {
                const auth = localStorage.getItem("token");
                const response = await fetch(SERVER + VER + "/app/reports/location_registry", {
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
        pageOrientation: 'landscape',

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

        body.push(['Инвентарный номер', 'Тип оборудования', 'Оборудование', 'Сотрудник']);

        data.forEach(function (row) {
            var dataRow = [];

            columns.forEach(function (column, index) {
                const columnTemp = [...column];
                let text = '';
                if (index === 3 || index === 2) {
                    columnTemp.forEach((col) => {
                        if (get(row, col) != null) {
                            text = text + " " + get(row, col)
                        }
                    })
                    if (text !== '') {
                        dataRow.push(text.toString());
                    } else {
                        dataRow.push('');
                    }
                } else {
                    if (get(row, column) != null) {
                        dataRow.push(get(row, column).toString());
                    } else {
                        dataRow.push('');
                    }
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
                widths: [100, 150, 250, 200],
                body: buildTableBody(data, columns)
            }
        };
    }

    function f() {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;

        list.forEach((item, i) => {
            content.push({text: 'Кабинет: ' + item.name + '\n\n', style: 'header'})

            content.push(table(item.registries, ['invNumber', ['model', 'deviceType', 'name'], [['model', 'firm', 'name'], ['model', 'name']], [['user', 'lastName'], ['user', 'firstName'], ['user', 'middleNames']]]))
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
            <iframe id="pdfV" style={{height: '100%', width: '100%'}} title={"0"}></iframe>
            <Button onClick={() => f()}>Сформировать отчет</Button>
        </>
    );
};

export default LocationRegistryReport;