const check = async (ctx, next) => {
    ctx.resSucess('ok');

    await next();
}

export default {
    check
}
