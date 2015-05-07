/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var winshow = false;
var i = 0;

$(document).ready(function () {

    var tooltip = $(".popup-text");
    var listTranslate = $('#js-answer');
    var selectDictionary = $('#js-select');
    var selectBlock = $('#dictionary-block');
    var englishWord = $(".english-word");

    $('#js-translate p').on('mouseup', function (e) {

        var txt = '';
        if (window.getSelection)
            txt = window.getSelection();
        else if (document.getSelection)
            txt = document.getSelection();
        else if (document.selection)
            txt = document.selection.createRange().text;

        if (winshow || txt.toString().trim() == '')
            return;
        
        txt = txt.toString().trim();
        if (/[a-z]|[A-Z]/.test(txt.toString())) {

            var pos = txt.toString().indexOf(' ');
            if (pos == -1)
                var word = txt;
            else {
                var temp = txt.toString().substr(0, pos);
                var word = temp.replace(/[,.!?;:()]/g, '');
            }

            if (/[a-z]|[A-Z]/.test(word.toString())) {

                // потом здесь будет $.ajax({..... 
                var data = {
                    "translateList": ["trsnlat888e1", "trsnlate2", "trsnlate3"],
                    "dictionaryList": [["nameDict1", "id1234"], ["nameDict2", "id123434"], ["nameDict3", "id1234sd"], ["nameDict4", "id12sad4"]],
                    "isExist": true
                };
                // фукция при успехе
                var handleFunction = function (data) {
                    winshow = true;
                    
                    tooltip.height(200);

                    if (data["isExist"] == true) {
                        for (var i in data.translateList) {
                            listTranslate.append('<li>' + data["translateList"][i] + '</li>');
                        }
                        ;
                        for (var i in data.dictionaryList) {
                            selectDictionary.append('<option>' + data["dictionaryList"][i][0] + '</option>').find('option:last').attr("value", data["dictionaryList"][i][1]);

                        }
                        ;
                    }
                    else {
                        listTranslate.append('<p class="no-translate">Перевод выбранного слова не найден</p>');
                        selectBlock.addClass('hidden');
                    }

                    englishWord.text(word);
                    $(".parent_popup_text").show();
                    tooltip.show().css({"top": e.offsetY + 30, "left": e.offsetX - 30});

                    var heightTooltip = tooltip.height();
                    var heightWrapper = $(".popup-text-wrapper").height() + 40;

                    if (heightWrapper > heightTooltip) {
                        tooltip.show().css({"height": heightWrapper});
                        heightTooltip = tooltip.height();
                    }

                    if ((e.offsetY + (tooltip.height())) >= ($("#js-translate").height())) {
                        tooltip.css({"top": e.offsetY - 25 - heightTooltip, "left": e.offsetX - 30});
                        tooltip.addClass('show-after');
                        tooltip.removeClass('show-before');
                    }
                    else {
                        tooltip.addClass('show-before');
                        tooltip.removeClass('show-after');
                    }

                };
                handleFunction(data);

            }

        }
    });


    $('body').on('click', '#js-answer li', function (e) {

        var idDictionary = selectDictionary.val();
        var word = englishWord.text();
        var translate = $(this).text();
        //console.log(idDictionary+' '+translate+' '+word);


//  $.ajax({
//      type: "POST",
//      url: "andrey",
//      data: idDictionary+word+translate,
//      success: function(data){ tooltip.hide('500'); }
//  });

    });

    $("#page-text-close, .parent_popup_text").on('click', function (e) {
        e.preventDefault();
        $(".popup-text, .parent_popup_text").hide();
        listTranslate.empty();
        selectDictionary.empty();
        selectBlock.removeClass('hidden');
        winshow = false;
    });

// sing-in and registration, recovery password
    $(".button-login").on('click', function (e) {
        e.preventDefault();
        $(".popup1, .parent_popup2").show('500');
    });
    $(".button-registration").on('click', function (e) {
        e.preventDefault();
        $(".popup2, .parent_popup2").show('500');
    });
    $(".recovery").on('click', function (e) {
        e.preventDefault();
        $(".recovery-password, .parent_popup2").show('500');
    });
    $(".parent_popup2, .close").on('click', function (e) {
        e.preventDefault();
        $(".popup1, .popup2, .recovery-password, .parent_popup2").hide('500');
    });

//label
    $("input").on('change', function () {
        var tr = $('.js-select-tr');
        if (this.checked)
            $(this).closest('tr').addClass('opened');
        else
            $(this).closest('tr').removeClass('opened');
    });

    $("#select-all").on('change', function () {
        if (this.checked)
            $(".js-select-tr").addClass('opened');
        else
            $(".js-select-tr").removeClass('opened');
    });

    $("#select-all").on('click', function () {
        var o = this.form.elements;
        for (var i = 0; i < o.length; i++)
        {
            if (o[i].type == "checkbox")
            {
                o[i].checked = this.checked;
            }
        }
    });

    $("#deleteWords").on('click', function () {
        $("#wordForm").append("<input type=\"hidden\" name=\"action\" value=\"deleteWords\">");
        $("#wordForm").submit();
    });

    $("#addDictionaryButton").on('click', function () {
        $("#addDictionaryForm").submit();
    });
});
