// js/screens/start.js
export const StartScreen = () => {
    return `
        <div class="screen start-screen">
            <h1>Unnamed Tower Defense</h1>

            <div class="auth-forms">
                <div class="login-section">
                    <h2>Login</h2>
                    <input type="text" id="login-user" placeholder="Usuário">
                    <input type="password" id="login-pass" placeholder="Senha">
                    <!-- Futuramente a função validará e fará navigateTo('levels') -->
                    <button onclick="navigateTo('levels')">Entrar</button>
                </div>

                <div class="register-section">
                    <h2>Cadastro</h2>
                    <input type="text" id="reg-user" placeholder="Usuário">
                    <input type="password" id="reg-pass" placeholder="Senha">
                    <input type="password" id="reg-pass-repeat" placeholder="Repetir Senha">
                    <button onclick="navigateTo('levels')">Cadastrar</button>
                </div>
            </div>

            <button class="settings-btn" onclick="navigateTo('settings')">Configurações</button>
        </div>
    `;
};