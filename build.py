import argparse, pathlib

def build(slides_path: str, output: str):
    template = pathlib.Path('template.html').read_text()
    slides = pathlib.Path(slides_path).read_text()
    html = template.replace('{{slides}}', slides)
    pathlib.Path(output).write_text(html)
    print(f'Generated {output} from {slides_path}')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Build presentation')
    parser.add_argument('slides', nargs='?', default='slides.md')
    parser.add_argument('-o', '--output', default='index.html')
    args = parser.parse_args()
    build(args.slides, args.output)
