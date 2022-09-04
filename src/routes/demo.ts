import validation from "../validation";
import demo from "../service/demo";

export default (router) => {
    router.get({
        path: '/1',
        validate: validation.empty
    }, [
        demo.check
    ])

    router.get({
        path: '/',
        validate: validation.empty
    }, [
        demo.check
    ])
}
