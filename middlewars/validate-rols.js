const isAdmin = (req, res, next) => {
    if(!req.person){
        return res.status(500).json({
            msg: "Se requiere validar el token"
        })
    }

    const { nombre, rol } = req.person;

    if(rol !== 'Admin'){
        return res.status(401).json({
            msg: `${nombre} no tiene los permisos suficientes`
        })
    }

    next();
}

const isRol = (...rols) => {
    return (req, res, next) => {
        if(!req.person){
            return res.status(500).json({
                msg: "Se requiere validar el token"
            })
        }

        if(!rols.includes(req.person.rol)){
            return res.status(401).json({
                msg: `El rol ${req.person.nombre} cuenta con los permisos necesarios`
            })
        }

        next();
    }
}

module.exports = {
    isAdmin,
    isRol
}