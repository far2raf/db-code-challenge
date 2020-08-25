import requests


def get_generator_with_data():

    r = requests.get('http://localhost:8080/streamTest/sse', stream=True)

    def eventStream():
        for line in r.iter_lines( chunk_size=1):
            if line:
                yield 'data:{}\n\n'.format(line.decode())

    return eventStream()


def get_generator_with_deals():

    r = requests.get('http://localhost:8090/deals', stream=True)

    def eventStream():
        for line in r.iter_lines( chunk_size=1):
            if line:
                yield 'data:{}\n\n'.format(line.decode())

    return eventStream()


if __name__ == "__main__":
    generator = get_generator_with_data()
    print("print one element from stream: ", next(generator))
    print("print list elements from stream: ", [next(generator) for i in range(3)])

    generator = get_generator_with_deals()
    print("print one element from stream: ", next(generator))
    print("print list elements from stream: ", [next(generator) for i in range(3)])
