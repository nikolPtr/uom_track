$(document).ready(function () {
    turnTextToInput();

    $("table").each(function () {
        var curTable = $(this)[0];
        calculateTimes(curTable, 1);
    });

    $('#table thead').on('click', 'th', function () {
        let row = $(this).parent().parent().find('tr').index($(this).parent());
        if (row !== undefined && row > 0) {
            let table = $(this).parent().parent().parent()[0];
            let column = $(this).parent().find('th').index(this);
            sortTable(table, column);
        }
    });

    // Remove row.
    $("body").on("click", ".rmvBtn", function () {
        $(this).parents('tr').remove();
    });

    // Clone row.
    $("body").on("click", ".copyBtn", function () {
        // $(this).parents('tr').remove();
        $(this).parents('tr').clone().appendTo($(this).parents('tr').parent('tbody').parent('table'));
    });
});

function turnTextToInput() {
    var x = document.querySelectorAll('table');
    var k = 0, i, j;
    var mytable = [x[0], x[1]];


    /*make inputs*/
    for (k = 0; k < 2; k++) {
        var tab = mytable[k];
        for (i = 2; i < tab.rows.length; i++) {
            for (j = 0; j < 3; j++) {
                var phrase = tab.rows[i].cells[j].textContent;
                tab.rows[i].cells[j].innerHTML = '<input type="text" value="' + phrase + '">';
            }
        }
    };
}

function sortTable(table, n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 2); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (x !== undefined) {
                xValue = x.innerHTML.toLowerCase();
                yValue = y.innerHTML.toLowerCase();

                if (xValue === undefined) {
                    xValue = x.value();
                }
                if (yValue === undefined) {
                    yValue = y.value();
                }
                if (dir == "asc") {
                    if (xValue > yValue) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (xValue < yValue) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function calculateTimes(table, columnIndex) {
    let columnValues = [];

    let min = 0;
    let max = 0;
    let avg = 0;
    for (i = 2; i < table.rows.length; i++) {
        addCopyButton(table, i);
        deleteCopyButton(table, i);

        let currentValue = parseFloat(table.rows[i].cells[columnIndex].innerHTML.replace("<input type=\"text\" value=\"", "").replace("\">", ""));
        columnValues.push(currentValue);
        avg = avg + currentValue;
        if (i === 2) {
            min = currentValue;
            max = currentValue;
        }
        else if (currentValue != 0) {
            if (min > currentValue) {
                min = currentValue;
            }
            if (max < currentValue) {
                max = currentValue;
            }
        }

        if (currentValue != 0 && min == 0) {
            min = currentValue;
        }
    }

    avg = avg / columnValues.length;

    var footer = table.createTFoot();
    var row = footer.insertRow(0);
    var cell = row.insertCell(0);
    cell.innerHTML = "<tr> <b> Best Score = '" + min + "' Worst Score = '" + max + "' Average = '" + avg + "' </b></tr>";
}

function addCopyButton(table, row) {
    let copyButtonCell = table.rows[row].insertCell(table.rows[row].cells.length);
    let copyButtonContent = document.createElement("button");
    copyButtonContent.setAttribute("class", "copyBtn");
    copyButtonContent.innerHTML = '<i class="fas fa-copy"></i>';
    copyButtonCell.appendChild(copyButtonContent);
}

function deleteCopyButton(table, row) {
    let deleteButtonCell = table.rows[row].insertCell(table.rows[row].cells.length);
    let deleteButtonContent = document.createElement("button");
    deleteButtonContent.setAttribute("class", "rmvBtn");
    deleteButtonContent.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButtonCell.appendChild(deleteButtonContent);
}
