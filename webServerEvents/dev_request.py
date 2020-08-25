import requests

if __name__ == "__main__":

    r = requests.post("http://127.0.0.1:8090/average-buy-sell-per-instrument",
                    data={"instrument" : "Galactia", "counterparty" : "Lewis",
                    "date_begin" : "08/24/2020 4:04 PM", "date_end" : "08/25/2020 4:04 PM"})
    print(r.text, r.status_code)
