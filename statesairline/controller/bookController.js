// POST /book에서 사용할 uuid입니다.
const flights = require('../repository/flightList');
const { v4: uuid } = require('uuid');
// 항공편 예약 데이터를 저장합니다.
let booking = [];

module.exports = {
  // [GET] /book 요청을 수행합니다.
  // 전체 예약 데이터를 조회합니다.
  findAll: (req, res) => {
    return res.status(200).json(booking);
  },
  // [GET] /book/:phone 요청을 수행합니다.
  // 요청 된 phone과 동일한 phone 예약 데이터를 조회합니다.
  findByPhone: (req, res) => {
    const {phone} = req.params;
    let list = booking;
    if(phone) {
      list = list.filter((item) => {
        return phone === item.phone;
      })
     return res.status(200).json(list);
    }
    return res.status(200).json(list)

  },
  // [GET] /book/:phone/:flight_uuid 요청을 수행합니다.
  // 요청 된 id, phone과 동일한 uuid, phone 예약 데이터를 조회합니다.
  findByPhoneAndFlightId: (req,res) => {
    const {phone, flight_uuid} = req.params;
    // TODO:
    let list = booking;
    if(flight_uuid){
      list = list.filter((item) => {
        return flight_uuid === item.flight_uuid;
      })
      res.status(200).json(list);
    }
    if(phone){
      list = list.filter((item) => {
        return phone=== item.phone;
      })
      res.status(200).json(list);
    }
    return res.status(200).json(list)
  },
  // [POST] /book 요청을 수행합니다.
  // 요청 된 예약 데이터를 저장합니다.
  create:  (req, res) => {
    // POST /book에서 사용할 booking_uuid입니다.
    const booking_uuid = uuid();
    // TODO:
    booking.push(req.body)
    return res.status(201).json({});
  },

  // Optional
  // [DELETE] /book/:booking_uuid 요청을 수행합니다.
  // 요청 된 id, phone 값과 동일한 예약 데이터를 삭제합니다.
  deleteByBookingId:  (req, res) => {
    const {booking_uuid} = req.params;
    // TODO:
    if(req.query.phone && req.query.flight_uuid) {
      booking = booking.filter(el => el.phone !== req.query.phone && el.flight_uuid !== req.query.flight_uuid)
      return res.status(200).filter(booking);
    }
  }
};
