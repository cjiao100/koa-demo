const check = async (ctx, next) => {
    ctx.resSuccess('ok');

    await next();
}

export default {
    check
}
