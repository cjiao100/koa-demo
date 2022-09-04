import validation from "../validation";
import demo from "../service/demo";

export default (router) => {
    router.setPrefix(`/demo`)

    router.get({
        path: '/1',
        validate: validation.empty
    }, [
        demo.check
    ])
}
