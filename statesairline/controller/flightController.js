const flights = require('../repository/flightList');
const fs = require('fs');

module.exports = {
  // [GET] /flight
  // 요청 된 파라미터 departure_times, arrival_times 값과 동일한 값을 가진 항공편 데이터를 조회합니다.
  // 요청 된 파라미터 departure, destination 값과 동일한 값을 가진 항공편 데이터를 조회합니다.
  findAll: async (req, res) => {
    const { departure_times, arrival_times, destination, departure } = req.query;
    // TODO:
    if(req.query.departure_times && req.query.arrival_times){
      let filtering1 = flights.filter( el => el.departure_times === req.query.departure_times && el.arrival_times === req.query.arrival_times)
      return res.status(200).json(filtering1);
    }
    if(req.query.departure && req.query.destination){
      let filtering2 = flights.filter(el => el.departure === req.query.departure && el.destination === req.query.destination)
      return res.status(200).json(filtering2);
    }

    return res.json(flights);
  },
  // [GET] /flight/:uuid
  // 요청 된 uuid 값과 동일한 uuid 값을 가진 항공편 데이터를 조회합니다.
  findById: async (req, res) => {
    const { uuid } = req.params;
    // TODO:
    if(req.params.id) {
      let filter = flights.filter(el => el.uuid === req.params.id)
      return res.status(200).json(filter);
    }
    return res.json(flights);

  },

  // Advanced
  // [PUT] /flight/:uuid 요청을 수행합니다.
  // 요청 된 uuid 값과 동일한 uuid 값을 가진 항공편 데이터를 요쳥 된 Body 데이터로 수정합니다.
  update: (req, res) => {
    const { uuid } = req.params;
    const bodyData = req.body;
     // TODO:
    if (uuid) {
      const list = flights.filter((item) => {
        return item.uuid === uuid;
      })

      let obj = Object.assign(list[0], bodyData);
      return res.json(obj);
    }
  }
};
