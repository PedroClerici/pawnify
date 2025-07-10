import { Tile } from './Tile.tsx';

export function Board() {
  const ranks = [...Array(8).keys()];
  const files = [...Array(8).keys()];

  return (
    <div relative>
      <div className="grid" grid="cols-8 rows-8" overflow="hidden" rounded="md">
        {files.map((rank) =>
          ranks.map((file) => (
            <Tile key={`${rank}${file}`} file={file} rank={rank} />
          )),
        )}
      </div>

      {/* <Pieces /> */}
    </div>
  );
}
