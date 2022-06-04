import {getSession} from "next-auth/client";

const YearlyLogPage = (props) => {
    return <>
        <h1>顯示{props.yearly}年未安排之任務</h1>
    </>
};

export async function getServerSideProps(context) {
    const session = await getSession({req: context.req});
    const {params} = context;
    const yearly = params.yearly;

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    return {
        props: {session, yearly},
    };
}

export default YearlyLogPage;