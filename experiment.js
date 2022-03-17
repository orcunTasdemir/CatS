var practice_audio = [
  "data/audio/practice/xuNIS1ga_XU1nisga.mp3",
  "data/audio/practice/paLO1ca_PA1loca.mp3",
  "data/audio/practice/teLU1ca_TE1luca.mp3",
];
//we need to manually preload all the audio
//to generate the audio file names, use the python script in the folder
var audio_from_list = [
  "data/audio/list_1/lliPAL1ta_lliPA1ta.mp3",
  "data/audio/list_1/LLI1fot_LLI1fo.mp3",
  "data/audio/list_1/LA1derca_LA1deca.mp3",
  "data/audio/list_1/TI1dut_TI1du.mp3",
  "data/audio/list_1/xuNIS1ga_XU1nisga.mp3",
  "data/audio/list_1/MI1tol_miTOL1.mp3",
  "data/audio/list_1/deTOS1pa_DE1tospa.mp3",
  "data/audio/list_1/RI1gul_riGUL1.mp3",
  "data/audio/list_1/guiTOL1_guiTO1.mp3",
  "data/audio/list_1/JE1tit_JE1ti.mp3",
  "data/audio/list_1/jaRAL1ta_jaRA1ta.mp3",
  "data/audio/list_1/NU1pit_NU1pi.mp3",
  "data/audio/list_1/SI1bu_siBU1.mp3",
  "data/audio/list_1/kuFO1da_KU1foda.mp3",
  "data/audio/list_1/fiTEL1ba_fiTE1ba.mp3",
  "data/audio/list_1/paLO1ca_PA1loca.mp3",
  "data/audio/list_1/NU1farba_NU1faba.mp3",
  "data/audio/list_1/moLES1da_MO1lesda.mp3",
  "data/audio/list_1/biCAL1_biCA1.mp3",
  "data/audio/list_1/xiPEL1ga_xiPE1ga.mp3",
  "data/audio/list_1/GO1pirda_GO1pida.mp3",
  "data/audio/list_1/FE1ca_feCA1.mp3",
  "data/audio/list_1/roTAS1ga_RO1tasga.mp3",
  "data/audio/list_1/DA1ti_daTI1.mp3",
  "data/audio/list_1/teLU1ca_TE1luca.mp3",
  "data/audio/list_1/BA1sserpa_BA1ssepa.mp3",
  "data/audio/list_1/PO1cu_poCU1.mp3",
  "data/audio/list_1/xeGUL1_xeGU1.mp3",
  "data/audio/list_1/XE1col_xeCOL1.mp3",
  "data/audio/list_1/CA1fol_caFOL1.mp3",
  "data/audio/list_1/luDIL1_luDI1.mp3",
  "data/audio/list_1/seRO1ba_SE1roba.mp3",
];

audio = practice_audio.concat(audio_from_list);

console.log(audio);

//Global variables will go here
var N_PRACTICE_QUESTIONS = 2;

var N_QUESTIONS_PER_BLOCK = 60;

var welcome_string = "Welcome to CatS, please press any button to begin!";

var consent_string =
  "<p>Consent text: [...] If you are willing to participate in the experiment after having read the instructions and the terms of consent please press <b>Agree</b> to continue on with the experiment. If you no longer wish to participate, please press <b>Disagree</b> to terminate the experiment. <br> Thank you</p>";

var experiment_ended_on_request_string =
  "The experiment ended on request.<br>Thank you for your participation!";

var instruction_string =
  "<p>Instructions: <br>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>";

var practice_string =
  "The practice portion will begin on the next screen. Press any key to begin.";

var experiment_starting_string = "Experiment is starting, press any key to continue!"

let full_screen_gap = 1000;
let welcome_gap = 1000;
let consent_gap = 1000;
let instructions_gap = 2000;
let survey_gap = 1000;
let rounds_gap = 2000;

//We initialize the JsPsych here
var jsPsych = initJsPsych({
  //we need audio so we enable it
  use_webaudio: true,
  override_safe_mode: true,
  //I want to see how the data looks like when the experiment is over
  //so I include this function to see the data "on_finish", it will be commented out for the real experiment
  on_finish: function () {
    //we can display the data when we want to
    //jsPsych.data.displayData();
  },
});

//This is the timeline where we will add all the javascript variables
//(the trials and instrucitons and whatnot) so they can appear on the
//screen in chronological order
var timeline = []; //it is a variable and it is initialized as an empty list

//we choose to preload all the data, whether it be audio, pictures, or
//text data beforehand so that the experiment does not lag in run time
var preload = {
  type: jsPsychPreload,
  audio: audio,
  auto_preload: true,
};

//so that the participant is forced to do the experiment in fullscreen
var enter_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
  post_trial_gap: full_screen_gap,
};

//Welcome page with type html keyboard response
var welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: welcome_string,
  post_trial_gap: welcome_gap,
};

//Consent form will go here.
var consent = {
  type: jsPsychHtmlButtonResponse,
  stimulus: consent_string,
  choices: ["Agree", "Disagree"],
  on_finish: function (data) {
    choice = data.response;
    //console.log(choice);
    //Terminate the experiment if they do not want to continue
    if (choice == 1) {
      jsPsych.endExperiment(experiment_ended_on_request_string);
    }
  },
  post_trial_gap: consent_gap,
};

//Instructions will go here
var instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: instruction_string,
  choices: [
    "I understood the Instructions, continue to the experiment",
    "Leave the experiment",
  ],
  on_finish: function (data) {
    choice = data.response;
    //console.log(choice);
    //Terminate the experiment if they do not want to continue
    if (choice == 1) {
      jsPsych.endExperiment(experiment_ended_on_request_string);
    }
  },
  post_trial_gap: instructions_gap,
};

//Demographics survey will go here
var demographics_survey = {
  type: jsPsychSurvey,
  pages: [
    [
      {
        type: "text",
        prompt: "What is your age?",
        name: "age",
        textbox_columns: 30,
        required: true,
      },
      {
        type: "text",
        prompt: "What is your native language?",
        name: "language",
        textbox_columns: 30,
        required: true,
      },
      {
        type: "text",
        prompt: "What are other languages you speak?",
        name: "other_languages",
        textbox_columns: 30,
        required: true,
      },
      {
        type: "multi-choice",
        prompt: "Have you ever been abroad?",
        options: ["Yes", "No"],
        required: true,
      },
    ],
  ],
  button_label_finish: "Finish survey and continue to the experiment",
  post_trial_gap: survey_gap,
};

// practice block
var practice_instructions = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: practice_string,
  post_trial_gap: instructions_gap,
};

var practice = {
  type: jsPsychAudioKeyboardResponse,
  stimulus: jsPsych.timelineVariable("Audio"),
  choices: ["ArrowLeft", "ArrowRight"],
  post_trial_gap: rounds_gap,
  response_ends_trial: true,
};

var practice_timeline = {
  timeline: [practice],
  timeline_variables: practice_stimuli,
  prompt: "<p>Which word you heard is more likely to be a word in Catalan?</p>",
  randomize_order: true,
  // on_timeline_start: function(){
  //   document.write('<html><body><h2>dfvnfdjvndfjvn</h2></body></html>');
  //  return 0;
  //}
};

// real experiment block
var experiment_starting = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: experiment_starting_string,
  post_trial_gap: instructions_gap,
};

var experiment = {
  type: jsPsychAudioKeyboardResponse,
  stimulus: jsPsych.timelineVariable("Audio_full_ext"),
  choices: ["ArrowLeft", "ArrowRight"],
  post_trial_gap: rounds_gap,
  response_ends_trial: true,
};

var experiment_timeline = {
  timeline: [experiment],
  timeline_variables: experiment_stimuli,
  prompt: "<p>Which word you heard is more likely to be a word in Catalan?</p>",
  randomize_order: true,
  // on_timeline_start: function(){
  //   document.write('<html><body><h2>dfvnfdjvndfjvn</h2></body></html>');
  //  return 0;
  //}
};



//we push every variable onto the timeline variable we created above
timeline.push(preload);
//timeline.push(enter_fullscreen);
timeline.push(welcome);
timeline.push(consent);
timeline.push(instructions);
//timeline.push(demographics_survey);
timeline.push(practice_instructions);
timeline.push(practice_timeline);

timeline.push(experiment_starting);
timeline.push(experiment_timeline);


//instead of pushing trials onto the timeline we create a bigger variable
//called test_procedure with trials in it and push this to the timeline instead
// var test_procedure = {
//     //the timeline for the test_procedure is a list of trials
//     timeline: [trials],
//     //timeline variables is the variable in the jokes.js file called
//     //test_stimuli which is the ovearching variable in the jokes.js
//     timeline_variables: test_stimuli,
//     //We randomize the order of the trials created so that everytime
//     //the code is run a participant will see a different ordering
//     //of the jokes
//     randomize_order: true

// }
// //we push this whole ting onto the timeline
// timeline.push(test_procedure);

/*var save_server_data = {
    type: jsPsychCallFunction,
    func: function() {
        var data = jsPsych.data.get().json();
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'php/save_json.php');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            filedata: data
        }));
    },
    post_trial_gap: 1000
}

timeline.push(save_server_data);*/

//at the end of it all we run the timeline with jsPsych
jsPsych.run(timeline);
