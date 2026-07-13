// js/i18n.js
import { GameState } from './app.js';

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
        'btn_start': 'Iniciar',
        'btn_buy': 'Comprar',

        'level_objective1': 'Objetivo: Destrua a base inimiga.',

        'f1_name': 'Vila Descolorida',
        'f1_desc': 'Uma misteriosa vila é encontrada, e seus habitantes parecem ter perdido sua cor. Qual será a razão disso?',
        'f2_name': 'Planícies Esbranquiçadas',
        'f2_desc': 'Mesmo além da vila, parece que há muitas pessoas que perderam sua cor. Isso parece estar se espalhando.',

        's1_name': 'Bola de Fogo',
        's1_desc': 'Invoca uma bola de fogo para queimar seus inimigos.',
        's2_name': 'Relâmpago',
        's2_desc': 'Lança um relâmpago para dar dano médio a seus oponentes.',
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
        'btn_start': 'Start',
        'btn_buy': 'Buy',

        'level_objective1': 'Objective: Destroy the enemy base.',

        'f1_name': 'Colorless Village',
        'f1_desc': 'A mysterious village is found, and the villagers there are becoming colorless. Why would this happen to them?',
        'f2_name': 'Whitened Plains',
        'f2_desc': 'Even beyond the village, it looks like there are a lot of people missing their color. This may be spreading.',

        's1_name': 'Fireball',
        's1_desc': 'Casts a small fireball to burn your enemies. Casts a small fireball to burn your enemies. Casts a small fireball to burn your enemies. Casts a small fireball.',
        's1_stats': 'Damage: 400 | Cost: 40 Mana | Cooldown: 10s',
        's2_name': 'Lightning Bolt',
        's2_desc': 'Summons a bolt of lightning dealing medium damage to your foes.',
        's2_stats': 'Damage: 900 | Cost: 75 Mana | Cooldown: 25s',
    }
};

export const t = (key) => {
    const lang = GameState.settings?.language || 'pt-BR';
    if (!dictionary[lang] || !dictionary[lang][key]) {
        console.warn(`[i18n] Tradução faltando para: [${lang}] ${key}`);
        return dictionary['pt-BR'][key] || key;
    }
    return dictionary[lang][key];
};