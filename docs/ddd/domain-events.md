### Domain Driven Design

- [][Chapter: 8. Domain Events]
  '역사는 사람들이 동의하기로 한 버전의 과거 이벤트이다.' 나플레옹 보나파르트

  - [][Road Map]
    - 도메인 이벤트가 무엇인지, 언제 그리고 왜 사용되는지 알아보자.
    - 어떻게 이벤트가 객체로 모델링 되는지, 언제 고유하게 식별되어야 하는지에 대해 알아보자.
    - 이벤트를 발행시키는 컴포넌트와 구독하는 컴포넌트를 확인하자.
    - 이벤트 저장소(Event Store)를 개발해야 하는 이유와 개발하는 방법, 사용되는 위치를 생각해보자.
    - 사스오베이션이 여러 방식으로 자동 시스템에 이벤트를 발행하는 방법을 배우자.
  
  - [][Index]
    - Domain Event
    

#### 도메인 이벤트

도메인에서 발생한 사건을 포착하기 위해 우리는 도메인 이벤트를 사용해야 한다. 이벤트가 실제로 무엇인지에 대해 동의함으로 우리는 강력한 모델링 도구인 도메인 이벤트를 사용하는 방법을 배울 것이다.
우선 도메인 이벤트를 구현하는 방법에 대해 먼저 살펴보자:

> 도메인 전문가가 관심을 가지고 있는 어떤 사건이 발생했다. 연속된 개별 이벤트를 묶어서 도메인에서 일어나는 활동의 정보를 모델링하고 이 이벤트들을 도메인 객체로 표현하자.
  도메인 이벤트는 도메인 모델을 완벽히 지원하며, 도메인에서 일어난 어떤 사건을 나타낸다. [Evans, Ref, 20쪽]

도메인 전문가가 말한 언어가 이벤트를 모델링 해야 할 이유와는 거리가 멀 수도 있지만, 그럼에도 비지니스 상황 때문에 여전히
필요할 때가 있다. 이런 상황은 이벤트를 외부의 서비스로 Broadcast 해야할 때 주로 발생하는데, 이때 엔터프라이즈 시스템은 결합에서 분리되어야 하고,
도메인 전반에 걸쳐 일어난 사건은 바운디드 컨텍스트 전체로 전달되어야 한다. **이벤트가 발행되면 구독자는 알림을 받게 된다.(pub/sub pattern, kafka, rabbitMQ)**.

이벤트가 로컬 시스템이든 외부 시스템이든 관심이 있는 대상으로 전달되었을 때엔 보통 결과적 일관성을 위해 사용된다. 이벤트의 소비는 로컬, 외부, 바운디드 컨텍스트를 통해 이루어진다. 

1. `Aggregate Root` 가 `이벤트`를 생성한다.
2. `Aggregate Root` 가 `이벤트` 를 `이벤트 발행자` 를 통해서 발행한다.
3. `이벤트 발행자` 는 `Event Store` 에 이벤트를 저장한다.
4. `Event Store` 의 저장되어 있는 이벤트를 `이벤트 구독자` 가 받아서 이 데이터에 대한 처리를 한다(데이터베이스 단일 트랜잭션).
5. 또는 `Event Store` 의 저장되어 있는 이벤트를 `이벤트 즉시전달구독자` 가 받아서 즉시 할수도 있다.
6. 이 때 메세징 미들웨어가 모델의 데이터 저장소를 공유하지 않는 한 즉시 전달에는 XA(두 단계 커밋)이 필요하다.

도메인 이벤트를 사용하기 전:
일반적인 배치처리 상황을 놓고 분석해보자. 시스템은 아마 사용량이 적은 시간대에 어떤 종류의 일일 유지 관리를 처리하게 된다.
블필요한 객체를 지우고, 새롭게 형성된 비지니스 상황을 지원하는데에 필요한 것들을 생성하고 일부 객체를 다른 객체와 일치시키고 심지어 어느 사용자에게는 공지사항 등과 같은 알림도 전송한다.
이와 같은 업무를 처리할 때에는 게산과 과정에는 큰 비용이 소모되고 모든 변경을 동기화하는 데에는 많은 트랜잭션이 필요하다.

도메인 이벤트를 사용한 후:
전날 일어난 실제 시건 중에서 나중에 캐치업해야 하는 일이 무엇인지 생각해보고, 만약 이 개별 사건을 각각 하나의 이벤트로 포착해서 시스템의 리스너에게 발행한다면,
일이 간단해지지 않을까? 결과적으로 우리는 수신한 각 이벤트의 알림에 맞춰 작업을 하기만 하면 된다. 모델의 기술적 측면이나 협업 시스템의 목표에 따라 도메인 전문가가 직접 요구하는 수보다 이벤트가 더 많을 수 있다.
이럴 경우에는 이벤트 소싱을 살펴보도록 한다.

#### 이벤트 모델링
이벤트를 모델링 할때에는 해당 이벤트가 속한 바운디드 컨텍스트의 유비쿼터스 언어에 따라 이벤트와 그 속성을 명명하자. 에그리게잇 커맨드 오퍼레이션실행에 따른 결과로 이벤트가 발생한다면, 그 이름은 보통 실행된 커맨드로부터 파생된다.
이를 테면 `UserCreateCommandEvent` 등처럼 말이다. 여기서 `Command` 는 이벤트의 원인이므로 이벤트의 이름을 통해 과거에 발생한 커맨드도 적절히 나타낼 수 있다.
예제 시나리오에 따르면 우리가 백로그 항목을 스프린트로 커밋할 때 도메인에 일어난 일을 명시적으로 모델링하는 이벤트를 발행한다.

```typescript
interface DomainEvent {
  setAggregateRoot(): T;

  setAggregateRootId(): U;

  occuredOn(): Date;
}

class BacklogItem {
  // ...
  commitTo(sprint: Sprint) {
  }
}

@Event()
class BacklogItemCommitted implements DomainEvent {
  // 이벤트가 일어난 일의 의미를 표현하기 위해 필요한 다른 속성이 무엇인 지 결정한다.
  private aggregateRootId: Id;
  private aggregateRoot?: User;
  
  // 여기서는 어떤 백로그 아이템이 어떤 스프린트와 연결되어야 하는지에 대해 구체적으로 명시한 예를 보여주는 것이다.
  // 언젠가 Sprint 에게 이 이벤트의 내용을 전달해야만 하는데, 이를 구별하기 위한 식별자로 SprintId 를 명시했다.
  private sprintId: Id;
  private backlogItemId: Id;
  private occuredAt: Date;

  occuredOn(): Date {return undefined;}
  setAggregateRoot(): T {return undefined;}
  setAggregateRootId(): U {return undefined;}

}
```

여기까지 이벤트 설계에 대한 Code snippet 이다. 그렇다면 이벤트가 제공하는 행위에 대한 오퍼레이션은 어떻게 모델링해야 할까?
이는 일반적으로 아주 간단하다고 한다. 이벤트가 보통 불변으로 설계되기 때문에 이벤트의 인터페이스는 해당 원인을 반영한 속성을 운반하려는 목적을 가지고 있다는 것이 중요하다.
따라서 이벤트는 전체 상태의 초기화를 허용하는 단 하나의 생성자만을 가지고 있으며, 그와 함께 각 속성의 읽기 접근자를 포함하게 된다.

```typescript
import { UserCreatedEvent } from './user-created.event';

@Event()
class UserCreatedCommandEvent implements DomainEvent {
  private username: string;
  private password: string;
  constructor(
    readonly username: string,
    readonly password: string,
  ) {
    this.username = this.username(username);
    this.password = this.password(password);
  }
  get UserName(): string {
    return this.username;
  }
  get Password(): string {
    return this.password
  }
}

// main.ts
const userCreatedCommandEvent = new UserCreatedEvent('jeffrey', 'test');
```

아마 코드의 불변성을 지킴과 동시에 이벤트의 전체 상태의 초기화를 허용하는 다 하나의 생성자만을 가지고 있다는 의미는 바로 이럴 것이다.
생성시 인자로 전달된 데이터들이 또 다른 set 메서드에 의해 데이터가 변경되지 않음을 명시함으로서, 불변성을 지키는 요소가 되는 것이다.
이 이벤트를 생성하고, 발행하면 로컬 바운디드 컨텍스트의 구독자는 이를 통해 Sprint 에게 BacklogItem 이 최근에 커밋되었음을 알릴 수 있다.

```typescript
class Sprint {
  
  async consume() {
    MessageConsumer
      .instance(messageSource, false)
      .receiveOnly(new String[], new messageListener(Type.TEXT).handleMessage(
        type, messageId, messageTimestamp, messageText, tag, isRedelivery
      )).commit().orError();
  }
}
```

현재 제대로 된 코드 스니펫을 제공하고 있진 않지만, 로컬 바운디드 컨텍스트의 해당 이벤트를 구독하는 구독자는 현재 이벤트를 읽고, 이 이벤트에 대한
처리를 진행하면 될 일이다. 추후 이벤트 소싱과 관련하여 이벤트를 조금 더 강화하는 예제를 통해 이벤트가 어떻게 변화하는지 지켜보도록 하자.
도메인 내에서 발생한 이벤트이지만 이를 포착하지 못해 이벤트를 핸들링 할 수 없을 때, 이를 명시적으로 포착하기 위해 모델의 일부로 이를 핸들링하는 코드를 작성한다면,
포착하지 못한 이벤트에 대한 결과를 줄일 수 있을 것이다. 지금 이 README 를 작성하고 있는 작성자 제프리가 생각하기엔,
Command, Query 이벤트를 발생시키고 이를 CommandBus 또는 QueryBus 를 태워 이벤트를 전송하는 책임을 애초에 Aggregate Root 에게 부여하는 것이다. 그렇게 되면 다음과 같은 코드가 나올 것이다.

```typescript
import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from './user-created.event';

@Controller()
class UserController {

  constructor(@Inject(User) user: User) {}

  @Post()
  @HttpStatus(204)
  async create(data: UserCreateDto) {
    const user = await this.user.register(data);
    return { data: user }
  }
}

@AggregateRoot()
class User extends AggregateRoot {
  async register(data: UserCreateDto) {
    const command = new UserCreatedEvent('jeffrey', 'test');
    await this.commandBus.execute(command);
  }
}
```

어떤 하나의 데이터는 Aggregate Root 에 의해 단일 트랜잭션이 수행되어야 한다. 따라서 서비스 계층에서 비지니스 컨텍스트를 해결하기 이전에,
데이터의 처리에 대한 책임은 도메인이 가지고 있어야 한다고 생각한다. 여기에 덧붙여 객체의 불변성을 보호하기 위해 모든 추가적인 이벤트 행동이 부작용을 일으키지 않는지 확인하자.

> 다른 에그리게잇의 상태에 의존성을 갖는 애그리게잇의ㅣ 식별이 가장 쉬울 수 있는데, 여기엔 결과적 일관성이 필수적이다.

#### Aggregate 특성과 함께하기
위에서 Aggregate Root 가 이벤트를 생성하는 책임을 가져야 한다고 말했지만 조금 더 읽어보니, 이 생성의 책임은 도메인 서비스가 처리하는 것이 옳다고 한다.
도메인 서비스는 이렇게 만들어진 이벤트를 리파지토리에 추가하고 메세징 인프라를 통해 이벤트를 외부로 발행한다. 이때 외부 이벤트에 대한 구독자는 Loosed coupled 되어 있는 밖의 모듈이 구독자가 될 것이다.

```typescript
import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from './user-created.event';

@Controller()
class UserController {
  constructor(@Inject(UserService) userService: UserService) {
  }

  @Post()
  @HttpStatus(204)
  async create(data: UserCreateDto) {
    const user = await this.userService.register(data);
    return { data: user }
  }
}

@DomainService()
class UserService {
  constructor(
    @Inject(User) user: User,
    @Inject(EventStore) eventStore: EventStore
  ) {}

  async register() {
    const command = new UserCreatedEvent('jeffrey', 'test');
    await this.eventStore.save(command);
    this.commandBus.execute(command);
  }
}

@AggregateRoot()
class User extends AggregateRoot {

}

@EventStore()
class EventStore {
  save(event: any) {
    eventDB.save(event);
  }
}
```

이런식으로 작성할 수 있을 것 같다. 하지만 조금 더 생각해보면, 이벤트를 처리할 CommandHandler 의 execute() 메서드를 처리해야 할 책임은 aggregate root 가 아니다. 내 생각에는
이벤트를 발행할 책임은 aggregate Root 가 가지고, 이를 핸들링하여 처리할 책임은 서비스가 가지고 있다고 여전히 생각한다. 이렇게 생각하면 도메인 모델이 풍부하게 어떤 모델인지 설명할 수 있을까?

##### 식별자
고유 식별자를 이벤트에 할당하는 이유를 분명히 하자. 이벤트를 서로 구분해야 할 때가 있지 않을까? 인프런 조졸두인 이동욱님은 Nest.js 기반 위키에서 이벤트를 구분하기 위해 네이밍 객체를 하나 할당하고 확장했다.
하지만 IDDD 에서는 고유 식별자를 이벤트에 할당함으로서 이벤트를 구분할 수 있도록 권장하고 있다.

이벤트를 유발하고 생성해서 발행하는 위치는 바운디드 컨텍스트이다. 하지만 이벤트를 서로 비교해야 할 이유는 거의 없다. 혹시라도 이벤트를 구분해야 할 이유가 있다면 어떻게 해야할까?
이벤트의 필드로 이벤트 고유 식별자를 표현해주면 충분하다. `이벤트의 이름/타입, 식별자, 타임스탬프` 등으로 충분하다고 한다.
즉 이벤트가 외부로 발행될 경우에는 메세징 인프라 스트럭처가 이를 전달하기 위해 고유 식별자가 필요해진다고 한다. 이 이벤트가 어떤 이유에서든 한번 이상 전달된다면, 이를 테면
메세지를 한번 보내놓고 서버가 갑자기 Waiting 이 걸리거나, 중단됬을 경우, 이 메세지에 대한 발송을 재요청할 수 있다. 그러면 이벤트가 한번 이상 보내지게 된 셈이니 이 이벤트를 구독하는 구독자 입장에서는 중복으로 여겨질 수 있을 것이다.
일부 메세징 인프라는 이 고유 식별자를 header/envelop 의 일부로 제공한다고 한다. 이는 학습이 더 필요할 것 같다.

*Q: Value Object 처럼 equals(), hashCode() 의 구현이 필요할까?*

A: 이것은 로컬 바운디드 컨텍스트에서 이를 사용할 때에만 필요하다고 한다.

*Q: IDDD 에서 이벤트가 Aggregate 으로 설계된다는 말은 어떤 의미일까?*

#### 도메인 모델에서 이벤트를 발행하기
아까 위에서 언급한 도메인 이벤트를 생성하고 발행하는 책임에 대해 명시가 되어있다. 한번 읽어보자.

1. 도메인 모델이 어떤 종류의 미들웨어 메세징 인프라든 노출이 되지 않도록 하라.
   - 이런 컴포넌트는 오직 인프라 내에만 위치한다.
   - 도메인 모델이 이런 인프라를 간접적으로 사용할 땐 절대 명시적 결합(coupling)을 형성하지 않는다.
   - 전혀 인프라를 사용하지 않는 접근법을 이용해라.
     - 경량 옵저버(Observer pattern, gamma)를 이용해라
     - 이것이 간결한 이유는 이벤트를 발행할 때 네트워크를 통과하지 않는다는 것을 말한다. (카프카 등 외부 메세징 인프라의 사용을 의미하는 듯함)
2. 발행자
   - 도메인 이벤트를 사용하는 가장 흔한 사황은 에그리게잇이 이벤트를 생성해서 발행할 때다. 발행자는 모델의 모듈 내에 위치하지만
     여기엔 도메인의 어떤 면도 모델링되지 않는다고 한다. `this.eventBus.execute()` 가 모델의 내부에 위치하지만 도메인의 어떤 면도 모델링 되어선 안된다는 것을 의미하는 듯함.

```typescript
class DomainEventPublisher {
  private static subscriber: T
  private static publishing: U

  constructor() {}
  
  public static instance() {}
  public DomainEventPublisher() {}
  public publish<T>(domainEvent: T): void {}
}
```

해당 코드는 IDDD 389~390p 에 나와 있다. 이것은 도메인 이벤트를 발행하는 발행자 코드이기 때문에 Nest.js 에서 `commandBus.execute` 구문을 이해하면 될 것 같다.
이 코드를 약간의 수도 코드로 표현하면:

command.execute() -> DomainEventSubscriber -> (subscribe) -> w