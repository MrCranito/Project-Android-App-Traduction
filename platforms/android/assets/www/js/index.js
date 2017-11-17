/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        console.log($("select[name='speak_to_translate'] > option:selected").val());
        document.addEventListener("offline", onOffline, false);
        document.addEventListener("online", onOnline, false);
        var button_anim = document.getElementById("button_translate");

        


        function onOffline() {
                    $('#error_internet').show();
                    $('#success_internet').css('display','none');

        // Handle the offline event
                }
        function onOnline() {
                    $('#success_internet').show();
                    $('#error_internet').css('display','none');
                    $('#success_internet').hide(2000);
                    // Handle the online event
                }

        function checkConnection() {
             var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            alert('Connection type: ' + states[networkState]);

            
            }
            
        
        


            checkConnection();
            var Text = "test";    
            document.getElementById("button_translate").addEventListener("click", startRecognition);
            

            var my_Locale_select = ''+$("#country_selected").val().toLowerCase()+'-'+$('#country_selected').val()+''; 

            function startRecognition(){
                    $('#button_translate').addClass("anim");
                    window.plugins.speechRecognition.startListening(function(result){
                       
                        
                        // Show results in the console
                        var my_Locale_select = ''+$("#country_selected").val().toLowerCase()+'-'+$('#country_selected').val()+'';
                        $('#speechtotext').html(''+result[0]+'');
                        console.log(result);

                        $('#button_translate').removeClass("anim");

                        Text = ""+result[0]+"";

                    }, function(err){
                        console.error(err);
                    }, {
                        language: my_Locale_select,
                        showPopup: false
                        
                    });
                   
                }
                

                // Verify if recognition is available
                window.plugins.speechRecognition.isRecognitionAvailable(function(available){
                    if(!available){
                        console.log("Sorry, not available");
                    }

                    // Check if has permission to use the microphone
                    window.plugins.speechRecognition.hasPermission(function (isGranted){
                        if(isGranted){
                            startRecognition();
                        }else{
                            // Request the permission
                            window.plugins.speechRecognition.requestPermission(function (){
                                // Request accepted, start recognition
                                startRecognition();
                            }, function (err){
                                console.log(err);
                            });
                        }
                    }, function(err){
                        console.log(err);
                    });
                }, function(err){
                    console.log(err);
                });
                
                var Texttranslated = "";
              
                $("#button_texttospeech").click(function () {
                            var url = "https://translation.googleapis.com/language/translate/v2?key=AIzaSyAkhxpUAEH4u9mVZtk7fTc4KnlQ0xG-feY";
                            url += "&source=" + $("#country_selected").val();
                            url += "&target=" + $("#country_selected_out").val();
                            url += "&q=" + escape($("#speechtotext").val());
                            $.get(url, function (data, status) {
                 
                 $('#TxtTarget').html(''+data.data.translations[0].translatedText+'');
                 Texttranslated =""+data.data.translations[0].translatedText+"";
                 console.log(Texttranslated);
            });
        });
                
                 
                $("#button_texttospeech").click(function() {
                        var my_Locale = ''+$("#country_selected_out").val().toLowerCase()+'-'+$('#country_selected_out').val()+'';
                        TTS.speak({
                            text: Texttranslated,
                            locale:my_Locale,
                            rate: 0.75
                        }, function () {
                            console.log('success');
                        }, function (reason) {
                            console.log(reason);
                        });
                        });
         

        },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();