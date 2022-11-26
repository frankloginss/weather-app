import { useState } from 'react'
import { Paper, TextInput, Button, Text, Group, Loader, Space, Tooltip } from "@mantine/core";
import { IconAlertCircle } from '@tabler/icons';

function App() {

  const API_KEY = "7eca2450e1bf0f32eecc39b31b26549c";

  const [cityInput, setCityInput] = useState(""); //useState to set cityInput data
  const [weatherData, setWeatherData] = useState<any>({});

  async function getWeatherData(this: any) {
    try {
      const srvResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_KEY}&units=metric`
      );

      const data = await srvResponse.json();
      console.log(data);
      // setWeatherData(data);
      // data && setWeatherData(data)
      if (data?.cod === "400") {
        throw data.message
      } else {
        setWeatherData(data);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  const capitalizeFirstLetter = (str: string) => {
    var splitStr = str?.toLowerCase().split(' ');
    for (var i = 0; i < splitStr?.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr?.join(' '); 
 }

//  const handleSubmit = (e: undefined | string | any) => {
//     e.preventDefault();

//     console.log('form submitted ✅');
//   };

  return (
    <div
      style={{
        position: "static",
        height: "100vh",
        backgroundImage:
          "url('https://littlevisuals.co/images/manc_clouds.jpg')",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "80%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Paper
          withBorder
          p="lg"
          style={{
            maxWidth: "500px",
            backgroundColor: "black",
            color: "whitesmoke",
          }}
          shadow="xl"
          
        >
          <Group position="apart">
            <Text tt="capitalize" ta="center" size="xl" weight={500} fw={700}       variant="gradient"
      gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
      sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
      fz="xl">
              Get The Weather
            </Text>
          </Group>
          <Group position="apart" mb="lg">
            <Text size="lg">
              Enter a city, and get the current weather below!
            </Text>
          </Group>
          <Group position="apart" mb="md">
            <TextInput
              withAsterisk
              // label="City Name"
              aria-label="City name"
              placeholder="City Name"
              color="white"
              onChange={(e) => setCityInput(e.target.value)} //city input data
              variant="default"
              // rightSection={<Loader size="xs" />}
              rightSection={
                <Tooltip label="This is public" position="top-end" withArrow>
                  <div>
                    <IconAlertCircle size={18} style={{ display: 'block', opacity: 0.5, color: 'black' }} />
                  </div>
                </Tooltip>
              }
            />
          </Group>
          <Group position="apart">
            <Button
              variant="gradient"
              size="md"
              onClick={() => getWeatherData()}
            >
              Get Weather
            </Button>
          </Group>
          {Object.keys(weatherData).length !== 0 && weatherData.message === undefined ? (
            <>
              <Group position="left" mt="lg">
                <Text size="lg" weight={500}>
                  {weatherData.name} Weather
                </Text>
              </Group>
              <Group position="left">
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                  width="100px"
                  height="100px"
                />
                <Text size="lg" weight={500}>
                  Currently {weatherData.main.temp} &deg;C
                </Text>
              </Group>
              <Group>
                <Text size="lg" weight={500} mb="md">
                  {`Feels like ${Math.round(
                    weatherData.main.feels_like
                  )}°C. ${capitalizeFirstLetter(
                    weatherData.weather[0].description
                  )}.`}
                </Text>
                </Group>
              <Group>
                <Text size="md" weight={100} c="teal.4">
                Wind Speed: <Text span c="blue" inherit>{`${weatherData.wind.speed}m/s `} </Text><Space w="md" /> 
                Pressure: <Text span c="blue" inherit>{weatherData.main.pressure}hPa</Text>
                </Text>
                <Text size="md" weight={100} c="teal.4">
                Humidity: <Text span c="blue" inherit>{`${weatherData.main.humidity}% `} </Text><Space w="md" /> 
                Visibility: <Text span c="blue" inherit>{weatherData.visibility / 1000}km</Text>
                </Text>
                <Text size="md" weight={100} c="teal.4">
                Max-Temp: <Text span c="blue" inherit>{`${weatherData.main.temp_max}°C. `} </Text><Space w="md" /> 
                Low-Temp: <Text span c="blue" inherit>{weatherData.main.temp_min}°C.</Text>
                </Text>
              </Group>
            </>
          ) :
          <Group position="left" mt="lg">
            <Text size="lg" weight={500} c="red">
              {capitalizeFirstLetter(weatherData.message)}
            </Text>
          </Group>}
        </Paper>
      </div>
    </div>
  )
}

export default App
