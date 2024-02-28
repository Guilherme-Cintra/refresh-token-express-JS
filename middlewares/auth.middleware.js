import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret_code';
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'secret_code2';

export const authenticateToken = async (req, res, next)  => {
    console.log("Authorization Header:", req.headers.authorization);

    //Récupération du token de l'en-tête
    //On split la chaîne et on récupère la deuxième partie où se trouve le token
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token:", token);

    //S'il n'y a pas de otken à l'en-tête on renvoie une erreur
    if(!token) return res.status(401).json({ message: 'Token requis' });

    //On vérifie si le token est valide. s'il est valide on donne on donne les infos de l'user à la requêt
    //Pour que les routes aient accès à celui-ci.
    // Si le Token n'est pas valide on envoie une erreur avec le message l'indiquant

    jwt.verify(token, secret, (err, utilisateur) => {
        //en cas d'erreur
        if(err){
            return res.status(403).json({ message: 'Token invalide ou expiré' });
        }
        req.utilisateur = utilisateur
        //passer à la prochaine étape
        next()
    })


}

export const authenticateRefreshToken = async (req, res, next) => {
    const {refreshToken} = req.body;
    console.log("Refresh Token : ", refreshToken);
    if (!refreshToken) return res.status(401).json({message: "Refresh token requis."});
    jwt.verify(refreshToken, refreshSecret, (err, utilisateur) => {
        if(err){
            console.log(err)
            return res.status(403).json({ message: 'Token refresh invalide ou expiré' });
        }
        req.utilisateur = utilisateur
        next();
    })
}