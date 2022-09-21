"use strict"

let buttons = ["#button1", "#button2", "#button3", "#button4", "#button5", "#button6", "#button7", "#button8", "#button9"]

let x

$(function () {
    $.ajax({
        type: "GET",
        url: "php/Load.php",
        success: function (answer) {
            $('#result').append(answer);
        }
    })

    $('.resetBtn').on('click', function () {
        setPoint(0, 0, 0)
        $.ajax({
            type: "GET",
            url: "php/Clear.php",
            success: function () {
                $('.resultFromPhp').remove();
            }
        })
    })

    $('.submitBtn').on('click', function (event) {
        let yC = $('.form-input').val()
        let xC = x
        let rC = $('input[name="r"]:checked').val();
        checkY(yC, xC, rC)
        event.preventDefault()
    })
})

function checkY(y, x, r) {
    if (!y) {
        showError('Y пуст')
    } else if (!x) {
        showError('Х пуст')
    } else if (!r) {
        showError('R пуст')
    } else if (y < -3 || y > 5) {
        showError('Y должен быть от -3 до 5')
    } else if (isNaN(y)) {
        showError('Y это число')
    } else {
        $.ajax({
            type: "GET",
            url: "php/Request.php",
            data: {Y: y, X: x, R: r},
            success: function (answer) {
                $('#result').append(answer);
            }
        })
        $('.infoCard').css({"opacity": "0"})
        setPoint(y, x, r)
    }
}

function setPoint(y, x, r) {
    $('#pointer').attr("cx", (x * 140 / r + 200))
        .attr("cy", (y * -140 / r + 200));
}

function setButton(e) {
    for (let el in buttons) {
        $(buttons[el]).css({"background": "rgba(255, 0, 0, 0.3)"});
    }
    e.target.style.background = "rgba(255, 0, 0, 0.5)"
    x = e.target.value
    e.preventDefault()
}

function showError(message) {
    $('.infoCard').css({"opacity": "1"})
    $('.infoCard div').text(message)
}