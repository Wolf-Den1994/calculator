var numbers = document.querySelectorAll('.number'),
   operations = document.querySelectorAll('.operator');
   decimalBtn = document.getElementById('decimal'),
   clearBrns = document.querySelectorAll('.clear-btn'),
   resultBtn = document.getElementById('result'),
   display = document.getElementById('display'),
   MemoryCurrentNumber = 0, // текущий номер, будет сохраняться сюда текущее на табло
   MemoryNewNumber = false, // новое число или нет... по умолчанию нет
   MemoryPendingOperation = '', // сохранение в памяти которая ожидается
   sqrtBtn = document.querySelector('.sqrt'),
   powBtn = document.querySelector('.pow'),
   mpBtn = document.querySelector('.minus-plus'),
   powxys = document.querySelector('.powxy');

for(i = 0; i < numbers.length; i++) {
   var number = numbers[i];
   number.addEventListener('click', function(e) {
      numberPress(e.target.textContent)
   });
};

for(i = 0; i < operations.length; i++) {
   var operationBtn = operations[i];
   operationBtn.addEventListener('click', function(e) {
      operation(e.target.textContent)
   });
};

for(i = 0; i < clearBrns.length; i++) {
   var clearBrn = clearBrns[i];
   clearBrn.addEventListener('click', function (e) {
      clear(e.srcElement.id)
   });
};

// for(i = 0; i < powxys.length; i++) {
//    var powxyBtn = powxys[i];
//    powxyBtn.addEventListener('click', function(e) {
//       powxyz(e.target.textContent)
//    });
// };

decimalBtn.addEventListener('click', decimal);

resultBtn.addEventListener('click', result);

sqrtBtn.addEventListener('click', sqrt);

powBtn.addEventListener('click', pow);

mpBtn.addEventListener('click', mp); // изменение знака с минуса на плюс (Minus Plus)

// powxyBtn.addEventListener('click', powxy); // x^y

// powxyBtn.addEventListener('click', function(e) {
//    console.log(e);
// }); // x^y



function numberPress(number){
   if(MemoryNewNumber){
      display.value = number;
      MemoryNewNumber = false;
   }else{
      if(display.value === '0'){
         display.value = number;
      }else{
         display.value += number;
      };
   };


   console.log('click  n ' + number + ' !');
};

function operation(op){
   (function() {
      function decimalAdjust(type, value, exp) {
        if (typeof exp === 'undefined' || +exp === 0) {
          return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // Если значение не является числом, либо степень не является целым числом...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
          return NaN;
        }
        // Сдвиг разрядов
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Обратный сдвиг
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
      }
    
      // Десятичное округление к ближайшему
      if (!Math.round10) {
        Math.round10 = function(value, exp) {
          return decimalAdjust('round', value, exp);
        };
      }
    })();



   var localOperationMemory = display.value;

   if(MemoryNewNumber && MemoryPendingOperation !== '='){
      display.value = MemoryCurrentNumber;
   }else{
      MemoryNewNumber = true;
      if(MemoryPendingOperation === '+'){
         MemoryCurrentNumber += parseFloat(localOperationMemory);
      }else if(MemoryPendingOperation === '-'){
         MemoryCurrentNumber -= parseFloat(localOperationMemory);
      }else if(MemoryPendingOperation === '*'){
         MemoryCurrentNumber *= parseFloat(localOperationMemory);
      }else if(MemoryPendingOperation === '/'){
         MemoryCurrentNumber /= parseFloat(localOperationMemory);
      }else if(MemoryPendingOperation === 'x^y'){
         MemoryCurrentNumber = parseFloat(Math.pow(MemoryCurrentNumber,localOperationMemory));
      } else {
         MemoryCurrentNumber = parseFloat(localOperationMemory);
      }
      display.value = Math.round10(MemoryCurrentNumber, -7)
      MemoryPendingOperation = op;
   };

   console.log('click  op ' + symbol + ' !');
};



function decimal(argument){
   var localDecimalMemory = display.value;

   if(MemoryNewNumber){
      localDecimalMemory = '0.';
      MemoryNewNumber = false;
   }else{
      if(localDecimalMemory.indexOf('.') === -1 ) {
         localDecimalMemory += '.';
      };
   };
   display.value = localDecimalMemory;

   console.log('click  decimalBtn');
};

function clear(id){
   if (id === 'ce') {
      display.value = '0';
      MemoryNewNumber = true;
   } else if (id === 'c') {
      display.value = '0';
      MemoryNewNumber = true;
      MemoryCurrentNumber = 0;
      MemoryPendingOperation = '';
   }

   console.log('click ' + id + ' !');
};

function sqrt(argument){
   var localSqrtMemory = display.value;

   if(localSqrtMemory < 0) {
      display.value = 'Error'
   } else {
      localSqrtMemory = Math.sqrt(localSqrtMemory);
      display.value = localSqrtMemory;
   }

   console.log('click argument sqrt !');
};

function pow(argument){
   var localPowMemory = display.value;
   localPowMemory = Math.pow(localPowMemory, 2);
   display.value = localPowMemory;
   
   console.log('click argument pow !');
};

function mp(argument){
   var localMinusPlusMemory = display.value;

         if(localMinusPlusMemory > 0){
            localMinusPlusMemory *= '-1';
         }else if(localMinusPlusMemory < 0){
            localMinusPlusMemory *= '-1';
         }

   display.value = localMinusPlusMemory;
   console.log('minusPlus');
};

// function powxyz(xy){
//    var localPowxyMemory = display.value;

//    if(MemoryNewNumber && MemoryPendingOperation !== '='){
//       display.value = MemoryCurrentNumber;
//    }else{
//       MemoryNewNumber = true;
//       if(MemoryPendingOperation === 'x^y'){
//          MemoryCurrentNumber = parseFloat(Math.pow(MemoryCurrentNumber,localPowxyMemory));
//       }else {
//          MemoryCurrentNumber = parseFloat(localPowxyMemory);
//       }
//    }
//    display.value = MemoryCurrentNumber;
//    MemoryPendingOperation = xy;

//    console.log('click argument pow x on y!');
// };