
var CURRENT_COLOR = "rgb(255, 102, 46)"; 
var DEFAULT_COLOR = "rgb(62, 62, 62)";
var IS_CLICKED = false;
var FILL_MODE = false;
var cells = [];

var COLOR_MAP = {
    "red": "rgb(255, 102, 46)",
    "green": "rgb(26, 218, 84)",
    "blue": "rgb(83, 15, 255)",
    "yellow": "rgb(255, 236, 26)",
    "skyblue": "rgb(142, 229, 255)"
};

document.addEventListener('mousedown', function() {
    IS_CLICKED = true;
});

document.addEventListener('mouseup', function() {
    IS_CLICKED = false;
});

let field = document.querySelector('.field');
const ROWS = 15;
const COLS = 30;
const TOTAL_CELLS = ROWS * COLS;
field.innerHTML = '';

for (let i = 0; i < TOTAL_CELLS; i += 1) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('id', `cell-${i}`);
    cell.setAttribute('data-index', i);
    field.appendChild(cell);
}

cells = document.querySelectorAll('.cell');

for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];

    cell.addEventListener('click', function() {
        if (FILL_MODE) {
            fillAllCells();
        } else {
            cell.style.backgroundColor = CURRENT_COLOR;
        }
    });
   
    cell.addEventListener('mouseover', function() {
        if (IS_CLICKED && !FILL_MODE) {
            cell.style.backgroundColor = CURRENT_COLOR;
        }
    });
   
    cell.addEventListener('mousedown', function(e) {
        if (FILL_MODE) {
            fillAllCells();
        } else {
            cell.style.backgroundColor = CURRENT_COLOR;
        }
    });
    
    cell.addEventListener('mouseenter', function() {
        if (IS_CLICKED && !FILL_MODE) {
            this.classList.add('no-hover');
        }
    });
    
    cell.addEventListener('mouseleave', function() {
        this.classList.remove('no-hover');
    });
}

function fillAllCells() {
    let clickedCellIndex = parseInt(document.querySelector('.cell:hover').getAttribute('data-index'));
    
    anime({
        targets: '.cell',
        backgroundColor: CURRENT_COLOR,
        easing: 'easeInOutQuad',
        duration: 500,
        delay: anime.stagger(50, {
            grid: [COLS, ROWS],
            from: clickedCellIndex
        }),
    });
   
    // После анимации устанавливаем цвет для всех ячеек
    setTimeout(() => {
        for (let j = 0; j < cells.length; j++) {
            cells[j].style.backgroundColor = CURRENT_COLOR;
        }
    }, 1000);
}

// Выбор цвета из палитры
let color_cells = document.querySelectorAll('.color-cell');
for (let i = 0; i < color_cells.length; i++) {
    let color_cell = color_cells[i];
    color_cell.addEventListener('click', function() {
        // Определяем цвет по классу элемента
        let colorClass = "";
        if (color_cell.classList.contains("red")) colorClass = "red";
        else if (color_cell.classList.contains("green")) colorClass = "green";
        else if (color_cell.classList.contains("blue")) colorClass = "blue";
        else if (color_cell.classList.contains("yellow")) colorClass = "yellow";
        else if (color_cell.classList.contains("skyblue")) colorClass = "skyblue";
       
        // Устанавливаем текущий цвет
        CURRENT_COLOR = COLOR_MAP[colorClass];
       
        // Выключаем режим заливки при выборе цвета
        FILL_MODE = false;
       
        // Обновляем выделение в палитре
        document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
        color_cell.classList.add('selected');
        
        // Убираем выделение с инструментов
        document.querySelector('.eraser').classList.remove('selected');
        document.querySelector('.fill-tool').classList.remove('selected');
    });
}

// Обработчик для ластика
document.querySelector('.eraser').addEventListener('click', function() {
    CURRENT_COLOR = DEFAULT_COLOR;
    FILL_MODE = false; // Выключаем режим заливки при выборе ластика
   
    // Убираем выделение с предыдущего выбранного элемента
    document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
   
    // Добавляем выделение на ластик
    this.classList.add('selected');
});

// Обработчик инструмента заливки
document.querySelector('.fill-tool').addEventListener('click', function() {
    FILL_MODE = true;
   
    document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
    this.classList.add('selected');
});

// Добавляем CSS для устранения конфликта hover
const style = document.createElement('style');
style.textContent = `
    .cell.no-hover:hover {
        background: inherit !important;
        opacity: 1 !important;
    }
`;
document.head.appendChild(style);
