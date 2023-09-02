import {createClient} from "@supabase/supabase-js";

export const supabase = createClient("https://oxomtwsztqakretgviqs.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94b210d3N6dHFha3JldGd2aXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM2NjcwNjMsImV4cCI6MjAwOTI0MzA2M30.bgorhgiaj7FNIqi63Fe46xSpuiMAuKlR7Mp6sMgvcqs")


export const getSession = async () =>
{
    const {data: {session}, error:err} = await supabase.auth.getSession();
    if(err){
        return undefined
    }else if(session){
        return true
    }
}