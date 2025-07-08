import { Tile } from './Tile.tsx';

export function Board() {
  const files = [...Array(8).keys()];
  const ranks = [...Array(8).keys()];

  return (
    <div relative>
      <div className="grid" grid="cols-8 rows-8" overflow="hidden" rounded="md">
        {ranks.map((rank) =>
          files.map((file) => (
            <Tile key={`${rank}${file}`} file={file} rank={rank} />
          )),
        )}
      </div>

      {/* <Pieces /> */}
    </div>
  );
}
