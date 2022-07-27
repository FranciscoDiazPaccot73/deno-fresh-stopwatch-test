/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Stopwatch from "../islands/Stopwatch.tsx";

interface WeatherData {
  main: string,
  description: string,
  icon: string,
  temp: number,
  name: string
}

export const handler: Handlers<any | null> = {
  async GET(_, ctx) {
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=697cb7795cff3ff2640e6a4556a4f91a&units=metric&q=${"Buenos Aires"}`
    const resp = await fetch(url);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const json = await resp.json();
    const { weather, main, name } = json;
    const data = {
      main: weather[0].main,
      description: weather[0].description,
      icon: weather[0].icon,
      temp: main.temp,
      name
    }
    return ctx.render(data);
  },
};

export default function Home({ data }: PageProps<WeatherData | null>) {
  return (
    <>
      <Head>
        <title>Stopwatch</title>
        <meta name="description" content="Deno Fresh stopwatch app" />
        <link rel="preload" as="image" href={`https://openweathermap.org/img/w/${data?.icon}.png`} />
      </Head>
      <div style={{
        display: 'flex',
        maxWidth: '1200px',
        margin: '16px auto',
        padding: '0 16px',
        flexDirection: 'column',
        alignItems: "center"
      }}>
        <div style={{
          position: "relative",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <img
            src="/logo.svg"
            height="100px"
            width="100px"
            alt="the fresh logo: a sliced lemon dripping with juice"
          />
          <div style={{
            position: "absolute",
            right: "16px"
          }}>
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute",
                right: "-4px",
                fontSize: "20px",
                top: "10px",
                fontWeight: 600
                }}>{`${Math.floor(data?.temp || 0)}° C`}</div>
              <img style={{ height: "50px", width: "50px" }} src={`https://openweathermap.org/img/w/${data?.icon}.png`} alt={data?.description} />
              <div style={{ marginTop: "-18px" }}>
                <div>
                  <span style={{ fontSize: "14px", marginRight: "4px" }}>{data?.name}</span>
                    &bull;
                  <span style={{ fontSize: "14px", marginLeft: "4px" }}>{data?.main}</span>
                </div>
                <span style={{ fontSize: "12px" }}>{data?.description}</span>
              </div>
            </div>
          </div>
        </div>
        <p style={{
          fontSize: '20px'
        }}> Stopwatch using Fresh</p>
        <Stopwatch />
      </div>
    </>
  );
}
