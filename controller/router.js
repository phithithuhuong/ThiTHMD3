const homeHandleRouter=require('./handle/HomeHandleRouter')

const router = {
    'home': homeHandleRouter.showHome,
    'create':homeHandleRouter.createHomestay,
    'edit': homeHandleRouter.editHomestay,
    'delete': homeHandleRouter.remove
}
module.exports= router;