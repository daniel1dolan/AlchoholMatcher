$(function() {
  let Qdetails = {
    key: "4328cc0b-c734-470f-a0db-67843f879d7c",
    customer_id: "cus_M_PGFidoSTKJmV",
    delivery_id: "blank",
    dropoff_address: "1334 Brittmoore Dr. Houston, TX 77043",
    dropoff_name: "name",
    dropoff_phone_number: "number",
    manifest: "items",
    manifest_items: ["items"],
    pickup_address: "12901 Queensbury Ln. Houston, TX 77079",
    pickup_name: "name",
    pickup_phone_number: "number",
    robo_pickup: "00:10:00",
    robo_pickup_complete: "00:20:00",
    robo_dropoff: "00:21:00",
    robo_delivered: "00:34:00"
  };
  $("#checkPrice").click(() => {
    //   quote response
    let Qresp = [];
    fetch(
      `https://api.postmates.com/v1/customers/${Qdetails.customer_id}/delivery_quotes?dropoff_address=${Qdetails.dropoff_address}&pickup_address=${Qdetails.pickup_address}`,
      {
        method: "POST"
        // headers: ["Authorization", btoa("4328cc0b-c734-470f-a0db-67843f879d7c")]
      }
    )
      .then(response => {
        return response.json();
      })
      .then(Array => {
        console.log(Array);
        Qresp = [...Qresp, ...Array];
      });
  });
  $("#confirmBtn").click(() => {
    // Send Delivery request
    let Dresp = [];
    fetch(
      `https://api.postmates.com/v1/customers/${Qdetails.customer_id}/deliveries?dropoff_address=${Qdetails.dropoff_address}&dropoff_name=${Qdetails.dropoff_name}&dropoff_phone_number=${Qdetails.dropoff_phone_number}&manifest=${Qdetails.manifest}&manifest_items=${Qdetails.manifest_items}&pickup_address=${Qdetails.pickup_address}&pickup_name=${Qdetails.pickup_name}&pickup_phone_number=${Qdetails.pickup_phone_number}`,
      {
        mode: "no-cors"
      }
    )
      .then(response => {
        return response.json();
      })
      .then(Array => {
        Qdetails.delivery_id = Array.delivery_id;
        console.log(Array);
        Dresp = [...Qresp, ...Array];
      });
  });
  $("#checkDelivery").click(() => {
    // Check on delivery progress
    let checkD = [];
    fetch(
      `https://api.postmates.com/v1/customers/${Qdetails.customer_id}/deliveries/${Qdetails.delivery_id}`
    )
      .then(response => {
        return response.json();
      })
      .then(Array => {
        console.log(Array);
        checkD = [...checkD, ...Array];
      });
  });
});
