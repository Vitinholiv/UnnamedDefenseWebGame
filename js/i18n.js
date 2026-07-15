// js/i18n.js
import { GameState } from './app.js';
import { SkillsData, LevelsData } from './components/data.js';

const dictionary = {
    'pt-BR': {
        'title_unnamed': 'UNNAMED',
        'title_defense': 'TOWER DEFENSE',
        'login_title': 'Acessar Conta',
        'login_user': 'Usuário',
        'login_pass': 'Senha',
        'login_btn': 'LOGIN',
        'login_toggle': 'Ainda não tem uma conta? <span>Cadastre-se!</span>',
        'back': 'Voltar',
        
        'reg_title': 'Nova Conta',
        'reg_user': 'Usuário',
        'reg_pass': 'Senha',
        'reg_pass_repeat': 'Confirme a Senha',
        'reg_btn': 'CADASTRAR',
        'reg_toggle': 'Já é veterano? <span>Voltar ao Login.</span>',
        
        'err_connect': 'Falha na comunicação com o servidor.',
        'err_fields': 'Preencha todos os campos corretamente.',
        'alert_error_title': 'Erro',
        'alert_info_title': 'Aviso',
        'alert_btn_ok': 'OK',

        'title_levels': 'CAMPANHA',
        'title_units': 'UNIDADES',
        'title_skills': 'HABILIDADES',
        'title_achievements': 'CONQUISTAS',
        'title_settings': 'CONFIGURAÇÕES',
        
        'nav_campaign': 'CAMPANHA',
        'nav_units': 'UNIDADES',
        'nav_skills': 'HABILIDADES',
        'nav_achievements': 'CONQUISTAS',

        'sfx_volume': 'Efeitos Sonoros',
        'music_volume': 'Música',
        'language': 'Idioma',
        'logout': 'Sair',
        'game_speed': 'Velocidade',
        'btn_start': 'Iniciar',
        'btn_buy': 'Comprar',
        'btn_purchased': 'Comprado',

        'level_objective1': 'Objetivo: Destrua a base inimiga.',

        'skill_stats': (x) => `Poder: ${SkillsData[`${x}`].power} | Mana: ${SkillsData[`${x}`].mana} | Recarga: ${SkillsData[`${x}`].cooldown}s | Custo: ${SkillsData[`${x}`].price}🟡`,
        'skill_stats_t': (x) => `Efeito: ${SkillsData[`${x}`].power}s | Mana: ${SkillsData[`${x}`].mana} | Recarga: ${SkillsData[`${x}`].cooldown}s | Custo: ${SkillsData[`${x}`].price}🟡`,
    },
    'en-US': {
        'title_unnamed': 'UNNAMED',
        'title_defense': 'TOWER DEFENSE',
        'login_title': 'Access Account',
        'login_user': 'Username',
        'login_pass': 'Password',
        'login_btn': 'LOGIN',
        'login_toggle': 'Still don\'t have an account? <span>Register now!</span>',
        'back': 'Return',
        
        'reg_title': 'New Account',
        'reg_user': 'Username',
        'reg_pass': 'Password',
        'reg_pass_repeat': 'Confirm Password',
        'reg_btn': 'REGISTER',
        'reg_toggle': 'Already a veteran? <span>Return to Login.</span>',
        
        'err_connect': 'Failed to communicate with the server.',
        'err_fields': 'Please fill all fields correctly.',
        'alert_error_title': 'Error',
        'alert_info_title': 'Warning',
        'alert_btn_ok': 'OK',

        'title_levels': 'CAMPAIGN',
        'title_units': 'UNITS',
        'title_skills': 'SKILLS',
        'title_achievements': 'ACHIEVEMENTS',
        'title_settings': 'SETTINGS',
        
        'nav_campaign': 'CAMPAIGN',
        'nav_units': 'UNITS',
        'nav_skills': 'SKILLS',
        'nav_achievements': 'ACHIEVEMENTS',

        'sfx_volume': 'Sound Effects',
        'music_volume': 'Music',
        'language': 'Language',
        'logout': 'Logout',
        'game_speed': 'Speed',
        'btn_start': 'Start',
        'btn_buy': 'Buy',
        'btn_purchased': 'Bought',

        'level_objective1': 'Objective: Destroy the enemy base.',

        'skill_stats': (x) => `Power: ${SkillsData[`${x}`].power} | Mana: ${SkillsData[`${x}`].mana} | Cooldown: ${SkillsData[`${x}`].cooldown}s | Cost: ${SkillsData[`${x}`].price}🟡`,
        'skill_stats_t': (x) => `Effect: ${SkillsData[`${x}`].power}s | Mana: ${SkillsData[`${x}`].mana} | Cooldown: ${SkillsData[`${x}`].cooldown}s | Cost: ${SkillsData[`${x}`].price}🟡`,
    }
};

export const t = (key, aux = '') => {
    const lang = GameState.settings?.language || 'pt-BR';

    if(dictionary[lang]?.[key] !== undefined){
        const value = dictionary[lang][key];
        return aux != '' ? value(aux) : value;
    }

    const skillMatch = key.match(/^s(\d+)_(name|desc)$/);
    if(skillMatch){
        const id = skillMatch[1];
        const prop = skillMatch[2];
        
        if(SkillsData[id] && SkillsData[id][prop]){
            if(SkillsData[id][prop][lang]){
                return SkillsData[id][prop][lang];
            } else if(SkillsData[id][prop]['pt-BR']){
                return SkillsData[id][prop]['pt-BR'];
            }
        }
    }

    const levelMatch = key.match(/^f(\d+)_(name|desc)$/);
    if(levelMatch){
        const id = levelMatch[1];
        const prop = levelMatch[2];

        if(LevelsData[id] && LevelsData[id][prop]){
            if(LevelsData[id][prop][lang]){
                return LevelsData[id][prop][lang];
            } else if(LevelsData[id][prop]['pt-BR']){
                return LevelsData[id][prop]['pt-BR'];
            }
        }
    }

    console.warn(`[i18n.js] Tradução faltando para: [${lang}] ${key}`);
    return dictionary['pt-BR']?.[key] || key;
};