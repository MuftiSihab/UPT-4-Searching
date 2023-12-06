import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";
import {Op} from "sequelize";

export const getProducts = async(req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Products.count({
        where:{
            [Op.or]: [{name: {
                [Op.like]: '%' + search + '%'
            }}, {nop: {
                [Op.like]: '%' + search + '%'
            }}]
        }
    });
    const totalPage = Math.ceil(totalRows / limit);
    try {
        let response;
        if(req.role === "admin") {
            response = await Products.findAll({
                where: {
                    [Op.or]: [{name: {
                        [Op.like]: '%' + search + '%'
                    }}, {nopel: {
                        [Op.like]: '%' + search + '%'
                    }}]
                },
                offset: offset,
                limit: limit,
                order: [
                    ['id', 'DESC']
                ],
                attributes: ["id","uuid", "nopel","name", "nop", "lt", "lb", "kec", "tahapan", "ket"],
                include: [{
                    model: Users,
                    attributes: ["name", "email"]
                }]
            });
        }else{
            response = await Products.findAll({
                where: {
                    [Op.or]: [{name: {
                        [Op.like]: '%' + search + '%'
                    }}, {nopel: {
                        [Op.like]: '%' + search + '%'
                    }}]
                },
                offset: offset,
                limit: limit,
                order: [
                    ['id', 'DESC']
                ],
                attributes: ["id", "uuid", "nopel","name", "nop", "lt", "lb", "kec", "tahapan", "ket"],
                include: [{
                    model: Users,
                    attributes: ["name", "email"]
                }]
            });
        }
        res.status(200).json({
            result: response,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage
        })
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const getProductById = async(req, res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Data Not Found"})
        let response;
        if(req.role === "admin") {
            response = await Products.findOne({
                attributes: ["uuid", "nopel","name", "nop", "lt", "lb", "kec", "tahapan", "ket"],
                where: {
                    id: product.id
                },
                include: [{
                    model: Users,
                    attributes: ["name", "email"]
                }]
            });
        }else{
            response = await Products.findOne({
                attributes: ["uuid", "nopel","name", "nop", "lt", "lb", "kec", "tahapan", "ket"],
                // user hanya bisa melihat apa yang dia buat
                // where:{
                //     [Op.and]: [{id: product.id}, {userId: req.userId}]
                // },
                include: [{
                    model: Users,
                    attributes: ["name", "email"]
                }]
            });
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const createProduct = async(req, res) => {
    const {nopel, name, nop, lt, lb, kec, tahapan, ket} = req.body;
    try {
        await Products.create({
            nopel: nopel,
            name: name,
            nop: nop,
            lt: lt,
            lb: lb,
            kec: kec,
            tahapan: tahapan,
            ket: ket,
            userId: req.userId
        })
        res.status(201).json({msg: "Product Created Successfully"})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }

};

export const updateProduct = async(req, res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Data Not Found"})
        const {nopel, name, nop, lt, lb, kec, tahapan, ket} = req.body;
        if(req.role === "admin") {
            await Products.update({nopel, name, nop, lt, lb, kec, tahapan, ket}, {
                where: {
                    id: product.id
                }
            });
        }else{
            if(req.userId !== product.userId) return res.status(403).json({msg: "Access Banned"})
            await Products.update({nopel, name, nop, lt, lb, kec, tahapan, ket}, {
                // where:{
                //     [Op.and]: [{id: product.id}, {userId: req.userId}]
                // }
            });
        }
        res.status(200).json({msg: "Product Updated Successfully"})
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const deleteProduct = async(req, res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Data Not Found"})
        if(req.role === "admin") {
            await Products.destroy({
                where: {
                    id: product.id
                }
            });
        }else{
            if(req.userId !== product.userId) return res.status(403).json({msg: "Access Banned"})
            await Products.destroy({
                // where:{
                //     [Op.and]: [{id: product.id}, {userId: req.userId}]
                // }
            });
        }
        res.status(200).json({msg: "Product Deleted Successfully"})
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};