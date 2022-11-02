#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
#![allow(warnings, unused)]

extern crate core;

use std::fs::File;
use std::io::Read;
use std::sync::RwLock;

use lazy_static::lazy_static;
use serde::{Deserialize, Serialize};
use serde_json;
use tauri::App;

use crate::wooting_macros_library::*;

//use crate::wooting_macros_library;

mod hid_table;
mod wooting_macros_library;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "PascalCase")]
pub struct ApplicationConfig {
    pub use_input_grab: bool,
    pub startup_delay: u64,
}

lazy_static! {
    pub static ref APPLICATION_STATE: MacroDataState = {
        MacroDataState::new()
    };
}

fn main() {
    tauri::Builder::default()
        // This is where you pass in your commands
        .manage(MacroDataState::new())
        .invoke_handler(tauri::generate_handler![
            get_configuration,
            set_configuration
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");


    // let mut data = String::new();
    //
    // match file.read_to_string(&mut data) {
    //     Ok(T) => {
    //         println!("Loaded the file");
    //         let config: ApplicationConfig =
    //             //TODO: rewrite this
    //             serde_json::from_str(&data).expect("JSON was not well-formatted");
    //         println!("{:#?}", config);
    //     }
    //     Err(E) => {}
    // }




    run_this(&get_config())
}


pub fn get_config() -> ApplicationConfig {
    let mut config: ApplicationConfig = ApplicationConfig {
        use_input_grab: false,
        startup_delay: 3,
    };

    let mut file = match File::open("config.json") {
        Ok(T) => T,
        Err(E) => {
            eprintln!("Error parsing the file {}", E);
            println!("Error finding the config.json file.\nPlease place one in the root directory. Using default configuration (safe).\nCreating an empty file.\n");
            File::create("config.json").unwrap()
        }
    };
    config
}