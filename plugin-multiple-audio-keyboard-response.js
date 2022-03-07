var jsPsychMultipleAudioKeyboardResponse = (function (jspsych) {
  "use strict";

  const info = {
    name: "multiple-audio-keyboard-response",
    parameters: {
      /** The audio file to be played. */
      stimuli: {
        type: jspsych.ParameterType.AUDIO,
        pretty_name: "Stimuli",
        default: undefined,
        array: true,
      },
      /** Array containing the key(s) the subject is allowed to press to respond to the stimulus. */
      answer: {
        type: jspsych.ParameterType.SELECT,
        pretty_name: "Answer",
        options: ["same", "different"],
        default: undefined,
      },
      /** The key that subjects should press to indicate that the two stimuli are the same. */
      same_key: {
        type: jspsych.ParameterType.KEY,
        pretty_name: "Same key",
        default: "ArrowLeft",
      },
      /** The key that subjects should press to indicate that the two stimuli are different. */
      different_key: {
        type: jspsych.ParameterType.KEY,
        pretty_name: "Different key",
        default: "ArrowRight",
      },
      /** How long to show a blank screen in between the two stimuli */
      gap_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: "Gap duration",
        default: 500,
      },
      /** Any content here will be displayed below the stimulus. */
      prompt: {
        type: jspsych.ParameterType.HTML_STRING,
        pretty_name: "Prompt",
        default: null,
      },
      /** If true, the trial will end when user makes a response. */
      response_ends_trial: {
        type: jspsych.ParameterType.BOOL,
        pretty_name: "Response ends trial",
        default: true,
      },
    },
  };

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  /**
   * **multiple-audio-keyboard-response**
   *
   * jsPsych plugin for playing multiple audio files and getting a keyboard response at the end
   *
   * @author Orcun Tasdemir
   * @see {@link https://www.jspsych.org/plugins/jspsych-multiple-audio-keyboard-response/ multiple-audio-keyboard-response plugin documentation on jspsych.org}
   */
  class MultipleAudioKeyboardResponsePlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }
    trial(display_element, trial, on_load) {
      // hold the .resolve() function from the Promise that ends the trial
      let trial_complete;
      // setup stimulus
      var context = this.jsPsych.pluginAPI.audioContext();
      // store response
      var response = {
        rt: null,
        key: null,
      };
      // record webaudio context start time
      var startTime;
      // wait time between audios
      var waitTime;

      // load audio file 1
      this.jsPsych.pluginAPI
        .getAudioBuffer(trial.stimuli[0])
        .then((buffer) => {
          if (context !== null) {
            this.audio_1 = context.createBufferSource();
            this.audio_1.buffer = buffer;
            this.audio_1.connect(context.destination);
          } else {
            this.audio_1 = buffer;
            this.audio_1.currentTime = 0;
          }
          setupTrial();
        })
        .catch((err) => {
          console.error(
            `Failed to load audio file 1 "${trial.stimuli[0]}". Try checking the file path. We recommend using the preload plugin to load audio files.`
          );
          console.error(err);
        });

      // load audio file 2
      this.jsPsych.pluginAPI
        .getAudioBuffer(trial.stimuli[1])
        .then((buffer) => {
          if (context !== null) {
            this.audio_2 = context.createBufferSource();
            this.audio_2.buffer = buffer;
            this.audio_2.connect(context.destination);
          } else {
            this.audio_2 = buffer;
            this.audio_2.currentTime = 0;
          }
          setupTrial();
        })
        .catch((err) => {
          console.error(
            `Failed to load audio file 2 "${trial.stimuli[1]}". Try checking the file path. We recommend using the preload plugin to load audio files.`
          );
          console.error(err);
        });

      const setupTrial = () => {
        // show prompt if there is one
        if (trial.prompt !== null) {
          display_element.innerHTML = trial.prompt;
        }
        // start audio
        if (context !== null) {
          startTime = context.currentTime;
          this.audio_1.start(startTime);
          sleep(gap_duration);
          startTime = context.currentTime;
          this.audio_2.start(startTime);
        } else {
          this.audio_1.play();
        }
        // start keyboard listener when trial starts
        if (true) {
          setup_keyboard_listener();
        }
        on_load();
      };
      // function to end trial when it is time
      const end_trial = () => {
        // kill any remaining setTimeout handlers
        this.jsPsych.pluginAPI.clearAllTimeouts();
        // stop the audio file if it is playing
        // remove end event listeners if they exist
        if (context !== null) {
          this.audio.stop();
        } else {
          this.audio.pause();
        }
        this.audio.removeEventListener("ended", end_trial);
        this.audio.removeEventListener("ended", setup_keyboard_listener);
        // kill keyboard listeners
        this.jsPsych.pluginAPI.cancelAllKeyboardResponses();
        // gather the data to store for the trial
        var trial_data = {
          rt: response.rt,
          stimulus: trial.stimulus,
          response: response.key,
        };
        // clear the display
        display_element.innerHTML = "";
        // move on to the next trial
        this.jsPsych.finishTrial(trial_data);
        trial_complete();
      };
      // function to handle responses by the subject
      function after_response(info) {
        // only record the first response
        if (response.key == null) {
          response = info;
        }
        if (trial.response_ends_trial) {
          end_trial();
        }
      }
      const setup_keyboard_listener = () => {
        // start the response listener
        if (context !== null) {
          this.jsPsych.pluginAPI.getKeyboardResponse({
            callback_function: after_response,
            valid_responses: trial.choices,
            rt_method: "audio",
            persist: false,
            allow_held_key: false,
            audio_context: context,
            audio_context_start_time: startTime,
          });
        } else {
          this.jsPsych.pluginAPI.getKeyboardResponse({
            callback_function: after_response,
            valid_responses: trial.choices,
            rt_method: "performance",
            persist: false,
            allow_held_key: false,
          });
        }
      };
      return new Promise((resolve) => {
        trial_complete = resolve;
      });
    }
    simulate(trial, simulation_mode, simulation_options, load_callback) {
      if (simulation_mode == "data-only") {
        load_callback();
        this.simulate_data_only(trial, simulation_options);
      }
      if (simulation_mode == "visual") {
        this.simulate_visual(trial, simulation_options, load_callback);
      }
    }
    simulate_data_only(trial, simulation_options) {
      const data = this.create_simulation_data(trial, simulation_options);
      this.jsPsych.finishTrial(data);
    }
    simulate_visual(trial, simulation_options, load_callback) {
      const data = this.create_simulation_data(trial, simulation_options);
      const display_element = this.jsPsych.getDisplayElement();
      const respond = () => {
        if (data.rt !== null) {
          this.jsPsych.pluginAPI.pressKey(data.response, data.rt);
        }
      };
      this.trial(display_element, trial, () => {
        load_callback();
        if (!trial.response_allowed_while_playing) {
          this.audio.addEventListener("ended", respond);
        } else {
          respond();
        }
      });
    }
    create_simulation_data(trial, simulation_options) {
      const default_data = {
        stimulus: trial.stimulus,
        rt: this.jsPsych.randomization.sampleExGaussian(500, 50, 1 / 150, true),
        response: this.jsPsych.pluginAPI.getValidKey(trial.choices),
      };
      const data = this.jsPsych.pluginAPI.mergeSimulationData(
        default_data,
        simulation_options
      );
      this.jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data);
      return data;
    }
  }
  AudioKeyboardResponsePlugin.info = info;

  return AudioKeyboardResponsePlugin;
})(jsPsychModule);
