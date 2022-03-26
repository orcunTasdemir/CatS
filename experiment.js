//Function to save data
function saveData(name, data) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "write_data.php"); // 'write_data.php' is the path to the php file described above.
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({ filedata: data }));
}

//we need to manually preload all the audio
//to generate the audio file names, use the python script in the folder
var practice_audio = [
  "data/audio/practice/xuNIS1ga_XU1nisga.mp3",
  "data/audio/practice/paLO1ca_PA1loca.mp3",
  "data/audio/practice/teLU1ca_TE1luca.mp3",
];
var audio_list_1 = [
  "data/audio/list_1/FE1ca_feCA1.mp3",
  "data/audio/list_1/roTAS1ga_RO1tasga.mp3",
  "data/audio/list_1/GO1pirda_GO1pida.mp3",
  "data/audio/list_1/DA1ti_daTI1.mp3",
  "data/audio/list_1/teLU1ca_TE1luca.mp3",
  "data/audio/list_1/xeGUL1_xeGU1.mp3",
  "data/audio/list_1/XE1col_xeCOL1.mp3",
  "data/audio/list_1/PO1cu_poCU1.mp3",
  "data/audio/list_1/BA1sserpa_BA1ssepa.mp3",
  "data/audio/list_1/luDIL1_luDI1.mp3",
  "data/audio/list_1/CA1fol_caFOL1.mp3",
  "data/audio/list_1/seRO1ba_SE1roba.mp3",
  "data/audio/list_1/LA1derca_LA1deca.mp3",
  "data/audio/list_1/LLI1fot_LLI1fo.mp3",
  "data/audio/list_1/lliPAL1ta_lliPA1ta.mp3",
  "data/audio/list_1/MI1tol_miTOL1.mp3",
  "data/audio/list_1/xuNIS1ga_XU1nisga.mp3",
  "data/audio/list_1/TI1dut_TI1du.mp3",
  "data/audio/list_1/guiTOL1_guiTO1.mp3",
  "data/audio/list_1/JE1tit_JE1ti.mp3",
  "data/audio/list_1/deTOS1pa_DE1tospa.mp3",
  "data/audio/list_1/RI1gul_riGUL1.mp3",
  "data/audio/list_1/jaRAL1ta_jaRA1ta.mp3",
  "data/audio/list_1/NU1pit_NU1pi.mp3",
  "data/audio/list_1/SI1bu_siBU1.mp3",
  "data/audio/list_1/fiTEL1ba_fiTE1ba.mp3",
  "data/audio/list_1/kuFO1da_KU1foda.mp3",
  "data/audio/list_1/NU1farba_NU1faba.mp3",
  "data/audio/list_1/paLO1ca_PA1loca.mp3",
  "data/audio/list_1/xiPEL1ga_xiPE1ga.mp3",
  "data/audio/list_1/biCAL1_biCA1.mp3",
  "data/audio/list_1/moLES1da_MO1lesda.mp3",
];
var audio_list_2 = [
  "data/audio/list_2/SE1romba_seROM1ba.mp3",
  "data/audio/list_2/FI1teba_FI1telba.mp3",
  "data/audio/list_2/NU1faba_nuFA1ba.mp3",
  "data/audio/list_2/guiTO1_GUI1to.mp3",
  "data/audio/list_2/lliFO1_lliFOT1.mp3",
  "data/audio/list_2/moLE1da_moLES1da.mp3",
  "data/audio/list_2/daTIT1_DA1tit.mp3",
  "data/audio/list_2/deTO1pa_deTOS1pa.mp3",
  "data/audio/list_2/xuNI1ga_xuNIS1ga.mp3",
  "data/audio/list_2/BA1ssepa_baSSE1pa.mp3",
  "data/audio/list_2/XE1co_XE1col.mp3",
  "data/audio/list_2/JA1rata_JA1ralta.mp3",
  "data/audio/list_2/feCAT1_FE1cat.mp3",
  "data/audio/list_2/GO1pida_goPI1da.mp3",
  "data/audio/list_2/MI1to_MI1tol.mp3",
  "data/audio/list_2/LLI1pata_LLI1palta.mp3",
  "data/audio/list_2/luDI1_LU1di.mp3",
  "data/audio/list_2/RI1gu_RI1gul.mp3",
  "data/audio/list_2/roTA1ga_roTAS1ga.mp3",
  "data/audio/list_2/xeGU1_XE1gu.mp3",
  "data/audio/list_2/PA1lonca_paLON1ca.mp3",
  "data/audio/list_2/XI1pega_XI1pelga.mp3",
  "data/audio/list_2/LA1deca_laDE1ca.mp3",
  "data/audio/list_2/biCA1_BI1ca.mp3",
  "data/audio/list_2/KU1fonda_kuFON1da.mp3",
  "data/audio/list_2/TE1lunca_teLUN1ca.mp3",
  "data/audio/list_2/siBUT1_SI1but.mp3",
  "data/audio/list_2/nuPI1_nuPIT1.mp3",
  "data/audio/list_2/CA1fo_CA1fol.mp3",
  "data/audio/list_2/tiDU1_tiDUT1.mp3",
  "data/audio/list_2/poCUT1_PO1cut.mp3",
  "data/audio/list_2/jeTI1_jeTIT1.mp3",
];
var audio_list_3 = [
  "data/audio/list_3/LLI1fo_lliFO1.mp3",
  "data/audio/list_3/xeCOL1_xeCO1.mp3",
  "data/audio/list_3/SI1but_SI1bu.mp3",
  "data/audio/list_3/DE1tospa_DE1topa.mp3",
  "data/audio/list_3/jaRA1ta_JA1rata.mp3",
  "data/audio/list_3/miTOL1_miTO1.mp3",
  "data/audio/list_3/PO1cut_PO1cu.mp3",
  "data/audio/list_3/seROM1ba_seRO1ba.mp3",
  "data/audio/list_3/laDER1ca_LA1derca.mp3",
  "data/audio/list_3/lliPA1ta_LLI1pata.mp3",
  "data/audio/list_3/RO1tasga_RO1taga.mp3",
  "data/audio/list_3/JE1ti_jeTI1.mp3",
  "data/audio/list_3/GUI1tol_guiTOL1.mp3",
  "data/audio/list_3/goPIR1da_GO1pirda.mp3",
  "data/audio/list_3/BI1cal_biCAL1.mp3",
  "data/audio/list_3/DA1tit_DA1ti.mp3",
  "data/audio/list_3/xiPE1ga_XI1pega.mp3",
  "data/audio/list_3/paLON1ca_paLO1ca.mp3",
  "data/audio/list_3/MO1lesda_MO1leda.mp3",
  "data/audio/list_3/kuFON1da_kuFO1da.mp3",
  "data/audio/list_3/caFOL1_caFO1.mp3",
  "data/audio/list_3/TI1du_tiDU1.mp3",
  "data/audio/list_3/FE1cat_FE1ca.mp3",
  "data/audio/list_3/LU1dil_luDIL1.mp3",
  "data/audio/list_3/nuFAR1ba_NU1farba.mp3",
  "data/audio/list_3/teLUN1ca_teLU1ca.mp3",
  "data/audio/list_3/riGUL1_riGU1.mp3",
  "data/audio/list_3/NU1pi_nuPI1.mp3",
  "data/audio/list_3/baSSER1pa_BA1sserpa.mp3",
  "data/audio/list_3/XU1nisga_XU1niga.mp3",
  "data/audio/list_3/XE1gul_xeGUL1.mp3",
  "data/audio/list_3/fiTE1ba_FI1teba.mp3",
];
var audio_list_4 = [
  "data/audio/list_4/caFO1_CA1fo.mp3",
  "data/audio/list_4/GUI1to_GUI1tol.mp3",
  "data/audio/list_4/DE1topa_deTO1pa.mp3",
  "data/audio/list_4/PA1loca_PA1lonca.mp3",
  "data/audio/list_4/MO1leda_moLE1da.mp3",
  "data/audio/list_4/BI1ca_BI1cal.mp3",
  "data/audio/list_4/SE1roba_SE1romba.mp3",
  "data/audio/list_4/nuFA1ba_nuFAR1ba.mp3",
  "data/audio/list_4/goPI1da_goPIR1da.mp3",
  "data/audio/list_4/nuPIT1_NU1pit.mp3",
  "data/audio/list_4/TE1luca_TE1lunca.mp3",
  "data/audio/list_4/RO1taga_roTA1ga.mp3",
  "data/audio/list_4/XI1pelga_xiPEL1ga.mp3",
  "data/audio/list_4/jeTIT1_JE1tit.mp3",
  "data/audio/list_4/tiDUT1_TI1dut.mp3",
  "data/audio/list_4/FI1telba_fiTEL1ba.mp3",
  "data/audio/list_4/feCA1_feCAT1.mp3",
  "data/audio/list_4/XU1niga_xuNI1ga.mp3",
  "data/audio/list_4/LU1di_LU1dil.mp3",
  "data/audio/list_4/JA1ralta_jaRAL1ta.mp3",
  "data/audio/list_4/XE1gu_XE1gul.mp3",
  "data/audio/list_4/riGU1_RI1gu.mp3",
  "data/audio/list_4/xeCO1_XE1co.mp3",
  "data/audio/list_4/daTI1_daTIT1.mp3",
  "data/audio/list_4/poCU1_poCUT1.mp3",
  "data/audio/list_4/laDE1ca_laDER1ca.mp3",
  "data/audio/list_4/KU1foda_KU1fonda.mp3",
  "data/audio/list_4/LLI1palta_lliPAL1ta.mp3",
  "data/audio/list_4/siBU1_siBUT1.mp3",
  "data/audio/list_4/lliFOT1_LLI1fot.mp3",
  "data/audio/list_4/miTO1_MI1to.mp3",
  "data/audio/list_4/baSSE1pa_baSSER1pa.mp3",
];

//All audio
all_audio = [audio_list_1, audio_list_2, audio_list_3, audio_list_4]

//Randomize the list being used
var test_stimuli = [list_1, list_2, list_3, list_4];

//from 0 to 3
selectedList = Math.floor(Math.random() * 4);

//All audio to reload
audio = practice_audio.concat(all_audio[selectedList]);

//a 3 digit number
subject_id = Math.floor(Math.random() * 900) + 100;

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

var experiment_starting_string =
  "Experiment is starting, press any key to continue!";

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
    saveData(jsPsych.data.get().csv());
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
  on_start: function () {
    document.querySelector("html").classList.add("hide-cursor");
  },
};

var practice = {
  type: jsPsychAudioKeyboardResponse,
  stimulus: jsPsych.timelineVariable("Audio"),
  choices: ["f", "j"],
  post_trial_gap: rounds_gap,
  prompt: "<p>Which word you heard is more likely to be a word in Catalan?</p>",
  response_allowed_while_playing: false,
};

var ask_to_repeat = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:
    "The practice session is complete, if you would like to repeat the practice session for more clarity? Press 'y' for yes, and 'n' for no.",
  choices: ["y", "n"],
  data: {
    task: "repeat",
  },
};

var practice_timeline = {
  timeline: [practice],
  timeline_variables: practice_stimuli,
  // on_timeline_start: function(){
  //   document.write('<html><body><h2>dfvnfdjvndfjvn</h2></body></html>');
  //  return 0;
  //}
};

var practice_procedure = {
  timeline: [practice_instructions, practice_timeline, ask_to_repeat],
  loop_function: function (data) {
    if (data.filter({ task: "repeat" }).values()[0].response == "y") {
      return true;
    } else {
      return false;
    }
  },
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
  choices: ["f", "j"],
  post_trial_gap: rounds_gap,
  response_allowed_while_playing: false,
  prompt: "<p>Which word you heard is more likely to be a word in Catalan?</p>",
};

var prompt = {
  type: js
}

var experiment_timeline = {
  timeline: [experiment, prompt],
  timeline_variables: test_stimuli[selectedList],
  randomize_order: true,
  // on_timeline_start: function(){
  //   document.write('<html><body><h2>dfvnfdjvndfjvn</h2></body></html>');
  //  return 0;
  //}
};

//we push every variable onto the timeline variable we created above
timeline.push(preload);
timeline.push(enter_fullscreen);
timeline.push(welcome);
timeline.push(consent);
timeline.push(instructions);
timeline.push(demographics_survey);
timeline.push(practice_procedure);

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

var wait_save = {
  type: jsPsychCallFunction,
  async: true,
  func: function (done) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "write_data.php");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response.success);
      }
      done(); // invoking done() causes experiment to progress to next trial.
    };
    xhr.send(jsPsych.data.get().json());
  },
};

timeline.push(wait_save);

//at the end of it all we run the timeline with jsPsych
jsPsych.run(timeline);
