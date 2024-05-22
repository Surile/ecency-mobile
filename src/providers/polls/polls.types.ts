import { PollPreferredInterpretation } from "../hive/hive.types";


//types generated by ChatGPT
export interface PollChoice {
    choice_num: number;
    choice_text: string;
    votes: {
        total_votes: number;
        hive_hp: number;
        hive_proxied_hp: number;
        hive_hp_incl_proxied: number;
    };
}

export interface PollVoter {
    name: string;
    choice_num: number;
    hive_hp: number;
    hive_proxied_hp: number;
    hive_hp_incl_proxied: number;
}

export interface PollStats {
    total_voting_accounts_num: number;
    total_hive_hp: number;
    total_hive_proxied_hp: number;
    total_hive_hp_incl_proxied: number;
}

export interface Poll {
    post_title: string;
    post_body: string;
    author: string;
    created: string;
    permlink: string;
    parent_permlink: string;
    tags: string[];
    image: any[]; // Adjust this type according to your data structure
    protocol_version: number;
    question: string;
    preferred_interpretation: PollPreferredInterpretation;
    token: string;
    end_time: string;
    max_choices_voted: number;
    status: string;
    filter_account_age_days: number;
    ui_hide_res_until_voted: any; // Adjust this type according to your data structure
    platform: any; // Adjust this type according to your data structure
    poll_trx_id: string;
    poll_choices: PollChoice[];
    poll_voters: PollVoter[];
    poll_stats: PollStats;
}