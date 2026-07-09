// js/screens/start.js
export const StartScreen = () => {
    const savedUsername = window.GameState && window.GameState.player ? window.GameState.player.username || '' : '';

    return `
        <div class="screen start-screen">
            <h1>Unnamed Tower Defense</h1>

            <div class="auth-forms">
                <div class="login-section">
                    <h2>Login</h2>
                    <input type="text" id="login-user" placeholder="Usuário" value="${savedUsername}">
                    <input type="password" id="login-pass" placeholder="Senha">
                    <button onclick="window.handleStartLogin()">Entrar</button>
                </div>

                <div class="register-section">
                    <h2>Cadastro</h2>
                    <input type="text" id="reg-user" placeholder="Usuário" value="">
                    <input type="password" id="reg-pass" placeholder="Senha">
                    <input type="password" id="reg-pass-repeat" placeholder="Repetir Senha">
                    <button onclick="window.handleStartRegister()">Cadastrar</button>
                </div>
            </div>

            <button class="settings-btn" onclick="window.navigateTo('settings')">Configurações</button>
        </div>
    `;
};