/** @jsx h */
import { h } from "preact";
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
              right: 0
            }}>{data?.temp}</div>
            <img style={{ height: "50px", width: "50px" }} src={`http://openweathermap.org/img/w/${data?.icon}.png`} alt={data?.description} ></img>
            <div>{data?.name}</div>
            <div>
              <span>{data?.main}</span>
              <span>{data?.description}</span>
            </div>
          </div>
        </div>
      </div>
      <p> Stopwatch using Fresh</p>
      <Stopwatch />
    </div>
  );
}
