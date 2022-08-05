import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './index.less';
import { replaceWhitespace } from '../../delSpace';

const content = `<body><div style="padding: 1px">12           3</div></body>`;
let rs = replaceWhitespace(content);
console.log(rs);

const Light = (props: API.IColor) => {
  const { color, isActive } = props;
  const colorStyle = useMemo(() => {
    let colorStyle = isActive ? { border: '5px solid #000000' } : {};
    switch (color) {
      case 'green':
        colorStyle = Object.assign(colorStyle, { backgroundColor: 'green' });
        break;
      case 'red':
        colorStyle = Object.assign(colorStyle, { backgroundColor: 'red' });
        break;
      default:
        colorStyle = Object.assign(colorStyle, { backgroundColor: 'yellow' });
    }
    return colorStyle;
  }, [color, isActive]);

  return (
    <div
      style={{
        ...colorStyle,
        width: '100px',
        height: '100px',
        borderRadius: '50%',
      }}
    ></div>
  );
};

export default function IndexPage() {
  const [lights, setLights] = useState<API.IColor[]>([
    {
      color: 'red',
      isActive: true,
    },
    {
      color: 'yellow',
      isActive: false,
    },
    {
      color: 'green',
      isActive: false,
    },
  ]);
  const [direaction, setDirection] = useState(1);
  const [delay, setDelay] = useState(1);
  const [isRun, setIsRun] = useState(false);
  const [timer, setTimer] = useState<
    string | number | NodeJS.Timer | undefined
  >();
  let direactionRef = 1;
  let cur = 0;

  const changeLights = () => {
    let nextActive = cur + direactionRef;
    if (nextActive >= lights.length) {
      nextActive = cur - 1;
      direactionRef = -1;
      setDirection(() => {
        return -1;
      });
    }
    if (nextActive < 0) {
      nextActive = cur + 1;
      direactionRef = 1;
      setDirection(() => {
        return 1;
      });
    }
    let temp = [...lights];
    temp[cur].isActive = false;
    temp[nextActive].isActive = true;
    cur = nextActive;
    setLights(temp);
  };

  const changeDelay = (delay: SetStateAction<number>) => {
    setDelay(delay);
  };

  const changeIsRun = () => {
    setIsRun(!isRun);
  };
  const handleInterval = () => {
    changeLights();
  };

  useEffect(() => {
    if (isRun) {
      let timer = setInterval(() => {
        handleInterval();
      }, delay * 1000);
      setTimer(timer);
    } else {
      clearInterval(timer);
    }
  }, [isRun]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '100px',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: 400,
          width: 120,
          border: '1px solid #cccccc',
          borderRadius: '30px',
        }}
      >
        {lights.map((item) => {
          return (
            <Light
              color={item.color}
              isActive={item.isActive}
              key={item.color}
            />
          );
        })}
      </div>
      <div>
        <button onClick={() => changeIsRun()}>{isRun ? '暂停' : '运行'}</button>
      </div>
      <div>方向向{direaction === 1 ? '下' : '上'}</div>
      <div>
        时间间隔:
        <input
          type="number"
          onChange={(e) => {
            changeDelay(Number(e.target.value));
          }}
          value={delay}
        />
      </div>
    </div>
  );
}
