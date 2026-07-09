// js/i18n.js
import { GameState } from './app.js';

const dictionary = {
    'pt-BR': {
        // Tela Inicial
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
        
        // Alertas
        'err_connect': 'Falha na comunicação com o servidor.',
        'err_fields': 'Preencha todos os campos corretamente.',
        'alert_error_title': 'Erro',
        'alert_info_title': 'Aviso',
        'alert_btn_ok': 'OK',

        // Títulos das Telas
        'title_levels': 'CAMPANHA',
        'title_units': 'UNIDADES',
        'title_skills': 'HABILIDADES',
        'title_achievements': 'CONQUISTAS',
        'title_settings': 'CONFIGURAÇÕES',
        
        // Menu de Navegação Inferior
        'nav_campaign': 'CAMPANHA',
        'nav_units': 'UNIDADES',
        'nav_skills': 'HABILIDADES',
        'nav_achievements': 'CONQUISTAS',

        // Configurações
        'sfx_volume': 'Efeitos Sonoros',
        'music_volume': 'Música',
        'language': 'Idioma',
        'logout': 'Sair',
    },
    'en-US': {
        // Start Screen
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
        
        // Alerts
        'err_connect': 'Failed to communicate with the server.',
        'err_fields': 'Please fill all fields correctly.',
        'alert_error_title': 'Error',
        'alert_info_title': 'Warning',
        'alert_btn_ok': 'OK',

        // Screen Titles
        'title_levels': 'CAMPAIGN',
        'title_units': 'UNITS',
        'title_skills': 'SKILLS',
        'title_achievements': 'ACHIEVEMENTS',
        'title_settings': 'SETTINGS',
        
        // Bottom Menu Navigation
        'nav_campaign': 'CAMPAIGN',
        'nav_units': 'UNITS',
        'nav_skills': 'SKILLS',
        'nav_achievements': 'ACHIEVEMENTS',

        // Settings
        'sfx_volume': 'Sound Effects',
        'music_volume': 'Music',
        'language': 'Language',
        'logout': 'Logout'
    }
};

/*
    Função global de tradução.
*/
export const t = (key) => {
    const lang = GameState.settings?.language || 'pt-BR';
    if (!dictionary[lang] || !dictionary[lang][key]) {
        console.warn(`[i18n] Tradução faltando para: [${lang}] ${key}`);
        return dictionary['pt-BR'][key] || key;
    }
    return dictionary[lang][key];
};