import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import CrudTitle from "../molecules/CrudTitle";

function DetailedRegion() {
  let [region, setRegion] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/detailRegion")
      .then((response) => response.json())
      .then((data) => setRegion(data.data));
  }, []);

  return (
    <div className="crudContainer">
      <CrudTitle title="DETAILED Region 🗺️" subTitle="View detailed region" />
      {region &&
        region.map((x) => {
          let cities = x.city_postal_codes?.split(",");
          return (
            <Card className="marginBottom">
              <Card.Header><h3>{x["Region Name"]}</h3></Card.Header>
              <Card.Body>
                <Card.Text>
                  {cities ? (
                    cities.map((city) => {
                      let city_postal_codes = city.split(`:`);
                      let cityName = city_postal_codes[0];
                      let postalCodes = city_postal_codes[1]?.split(`|`);
                      console.log({
                        cityName: city_postal_codes[0],
                        codes: city_postal_codes[1].split(`|`),
                      });
                      return (
                        <div>
                          <h5>{cityName}</h5>
                          Postal codes:{" "}
                          {postalCodes.map((x) => {
                            return (
                              <div>
                                {x}
                                <br />
                              </div>
                            );
                          })}
                          <br />
                        </div>
                      );
                    })
                  ) : (
                    <span>Empty</span>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
    </div>
  );
}

export default DetailedRegion;
