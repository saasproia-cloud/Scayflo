class AuthController {
    constructor(authService, mailerService) {
        this.authService = authService;
        this.mailerService = mailerService;
    }

    async register(req, res) {
        try {
            const user = await this.authService.register(req.body);
            await this.mailerService.sendWelcomeEmail(user.email);
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const token = await this.authService.login(email, password);
            res.status(200).json({ token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    async refreshToken(req, res) {
        try {
            const token = await this.authService.refreshToken(req.body.token);
            res.status(200).json({ token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}

export default AuthController;