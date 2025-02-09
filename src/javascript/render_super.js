const row_begin = `\n<div class="row g-0">`;
const col_begin = `\n<div class="col">`;

var code = ``;

// outer row
for (let i = 0; i < 3; i++) {
    var outer_row = row_begin;

    // outer col
    for (let j = 0; j < 3; j++) {
        var outer_col = col_begin;

        // inner row
        for (let k = 0; k < 3; k++) {
            var inner_row = row_begin
            
            // inner col
            for (let l = 0; l < 3; l++) {
                inner_row += col_begin + `\n<button id="c${i}${j}${k}${l}"></button>` + `</div>\n`;
            }
            inner_row += `</div>\n`;
            outer_col += inner_row;
        }
        outer_col += `</div>\n`;
        outer_row += outer_col;
    }
    outer_row += `</div>\n`;
    code += outer_row;
}
document.getElementById("box").innerHTML = code;