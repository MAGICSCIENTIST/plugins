
// import * as legislation from '../src/legislation/js/legislation'
~function () {
    //法律法规    
    var legislation = skyMapPluginsFactory.plugins.legislation;
    legislation.init("#law", {
        params: {
            getLaws: { SYS_ID: "1301008" },
            // getLawDetail:function
        }
    })



}()