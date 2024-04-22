import {runApp} from '@/app/db/connect';
import LineChart from "./components/LineChart";

async function testDBConnection() {
    let connection;
    try {
        connection = await runApp();
        console.log('Database connection successful');

        // Execute a simple query
        const result = await connection?.execute('SELECT year, us_average FROM ngobrian.averagefares');
        console.log(result?.rows); // log the result

        // Transform the data into the expected format
        return result?.rows.map(([year, us_average]) => ({year, us_average}));

    } catch (error) {
        console.error('Error getting database connection:', error);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

export default async function Home() {
    const data = await testDBConnection();
    return (
        <div className="bg-white">
            <div className="relative isolate pt-14">
                <div className="py-24 sm:py-32 lg:pb-40">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                Welcome to Group 6 Flights Queries Visualization. Click a link in the header to get
                                started.
                            </h1>
                        </div>
                        <div className="mt-16 flow-root sm:mt-24">
                            <div
                                className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 md:-m-4 md:rounded-2xl lg:p-4">
                            </div>
                            <div>
        <h3>Bar Chart</h3>
        <LineChart data={data} />
      </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}