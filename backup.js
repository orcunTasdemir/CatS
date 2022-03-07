//we need to manually preload all the audio
var audio = [
    "data/audio/PO1cu.mp3",
    "data/audio/PO1cut.mp3",
    "data/audio/poCU1.mp3",
    "data/audio/poCUT1.mp3",
  ];
  
  
  
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

//We initialize the JsPsych here
var jsPsych = initJsPsych({
  //we need audio so we enable it
  use_webaudio: true,
  override_safe_mode: true,
  //I want to see how the data looks like when the experiment is over
  //so I include this function to see the data "on_finish", it will be commented out for the real experiment
  on_finish: function () {
    jsPsych.data.displayData();
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
};

//Welcome page with type html keyboard response
var welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: welcome_string,
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
};

// practice block
var practice_instructions = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: practice_string
};

var trial = {
    type: jsPsychAudioKeyboardResponse,
    stimulus: 'sound/tone.mp3',
    choices: "NO_KEYS",
    trial_ends_after_audio: true
};

var practice_rounds = {
  type: jsPsychAudioKeyboardResponse,
  stimulus: jsPsych.timelineVariable("Audio_1"),
  choices: ["ArrowLeft", "ArrowRight"],
  prompt:
    "<p>Which word you heard is more likely to be a  word in Catalan?.</p>",
  response_ends_trial: true,
};

var practice_timeline = {
  timeline: [practice_rounds],
  timeline_variables: practice_stimuli,
  randomize_order: true,
};

//we push every variable onto the timeline variable we created above
timeline.push(preload);
//timeline.push(enter_fullscreen);
timeline.push(welcome);
timeline.push(consent);
timeline.push(instructions);
timeline.push(demographics_survey);
timeline.push(practice_instructions);
timeline.push(practice_timeline);

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



var practice_rounds = {
    timeline: [
        {
            type: jsPsychAudioKeyboardResponse,
            stimulus: jsPsych.timelineVariable("Audio_1"),
            trial_ends_after_audio: true,
            post_trial_gap: audio_gap
        },
        {
            type: jsPsychAudioKeyboardResponse,
            stimulus: jsPsych.timelineVariable("Audio_2"),
            response_ends_trial: true
        }
    ],
    prompt: "<p>Which word you heard is more likely to be a  word in Catalan?.</p>",
    choices: ["ArrowLeft", "ArrowRight"]
};


var practice_rounds = {
    type: jsPsychAudioKeyboardResponse,
    prompt:
      "<p>Which word you heard is more likely to be a  word in Catalan?.</p>",
    choices: ["ArrowLeft", "ArrowRight"],
    timeline: [
      {
        stimulus: jsPsych.timelineVariable("Audio_1"),
        post_trial_gap: audio_gap,
        trial_ends_after_audio: true
      },
      { stimulus: jsPsych.timelineVariable("Audio_2") },
    ],
    response_ends_trial: true,
    post_trial_gap: rounds_gap
  };



  var practice_1 = {
    type: jsPsychAudioKeyboardResponse,
    stimulus: jsPsych.timelineVariable("Audio_1"),
    post_trial_gap: audio_gap,
    trial_ends_after_audio: true,
  };
  
  var practice_2 = {
    type: jsPsychAudioKeyboardResponse,
    stimulus: jsPsych.timelineVariable("Audio_2"),
    choices: ["ArrowLeft", "ArrowRight"],
    post_trial_gap: rounds_gap,
    response_ends_trial: true,
  };
  
  var practice_round = {
    timeline: [practice_1, practice_2],
    timeline_variables: practice_stimuli,
    randomize_order: true,
  };
  
  var practice_timeline = {
      timeline: [practice_round],
      timeline_variables: practice_stimuli,
      prompt:
      "<p>Which word you heard is more likely to be a word in Catalan?</p>",
      randomize_order: false
  
  }