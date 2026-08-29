import { westChineseStaticChineseDetails } from "./interpretationDetailsWestChineseStaticChinese";
import { westernEarlyStaticDetails } from "./interpretationDetailsWesternEarly";
import { westernLateInterpretationDetails } from "./interpretationDetailsWesternLate";
import { westernMiddleStaticDetails } from "./interpretationDetailsWesternMiddle";
import type { InterpretationDetail } from "./interpretationTypes";

export const westChineseInterpretationDetails: Record<string, InterpretationDetail> = {
  ...westernEarlyStaticDetails,
  ...westernMiddleStaticDetails,
  ...westernLateInterpretationDetails,
  ...westChineseStaticChineseDetails,
  "heidegger-language-house": {
    context:
      "〈关于人道主义的书信〉开篇先把行动重新解释为使某物完成其本质，又说思并不制造人与存在的关系，而是让存在在语言中到来。紧接“语言是存在之家”的下一句是“人在它的家中居住”，随后把思者与诗人称为这个居所的守护者。因此“家”首先说明语言、思与存在显现的关系，而不是给语言下一个日常工具定义。",
    englishContext:
      "At the opening of Letter on Humanism, Heidegger first redescribes action as bringing something into the fullness of its essence and says that thinking does not manufacture the relation between humanity and being but lets being come to language. “Language is the house of Being” is followed immediately by “In its home man dwells,” and thinkers and poets are then called guardians of this home. The house therefore figures the relation among language, thinking, and the manifestation of being rather than defining language as an ordinary tool.",
    distinction:
      "这句短引既不是说词语像容器一样装入预先完成的思想，也没有证明语言系统单向决定一切经验。卡片原先关于“存在向我们打开”的说法是有根据的研读提示，但仍是对相邻段落的综合；它已保留在编辑摘要中，没有并入六词原句。",
    englishDistinction:
      "The short sentence neither says that words are containers for already completed thoughts nor proves that a language system unilaterally determines all experience. The former claim about Being opening to us is a defensible guide to the surrounding passage but remains a synthesis; it is preserved as editorial summary rather than folded into the six-word source sentence.",
  },
  "sartre-condemned-free": {
    context:
      "Mairet 英译第5页先从上帝不存在、没有先验价值表，推进到人没有借口且不存在决定论。完整原句随即解释“被判处”：人没有创造自己，却仍是自由的；一旦被抛入世界，就要对自己所做的一切负责。卡片只取其中最短、连续的一句，责任与处境的说明留在上下文和编辑摘要。",
    englishContext:
      "On p. 5 of the Mairet translation, Sartre moves from the absence of God and any intelligible table of values to the claims that humans are without excuse and that there is no determinism. The full sentence then explains “condemned”: a human being did not create himself, yet is at liberty and, once thrown into the world, is responsible for what he does. The card keeps only the shortest continuous sentence, leaving responsibility and situation to context and editorial summary.",
    distinction:
      "“自由”在这里不是拥有无限资源、可以控制所有结果，也不是把压迫与物质限制说成幻觉。萨特否认的是一个预定本质或外部价值能够替行动者完全承担选择。旧卡“无法选择是否选择”的表达概括了这一负担，但不是 Mairet 译文中的同一句。",
    englishDistinction:
      "Freedom here is neither unlimited capacity nor control of every outcome, and it does not make oppression or material constraint illusory. Sartre denies that a predetermined essence or external table of values can wholly assume the agent's choice. The former phrase “unable to choose whether to choose” captures that burden but is not part of the same sentence in Mairet's translation.",
  },
  "camus-sisyphus-happy": {
    context:
      "《西西弗神话》末段写西西弗再次走向石头，把命运视为自己的事情，并在没有主人和更高命运的宇宙中继续行动。末句之前，加缪说石头的每个微粒自成一个世界，向高处的挣扎足以充实一颗心；“必须想象西西弗是幸福的”由此结束全文。卡片不再把后加的解释性续句冒充原文。",
    englishContext:
      "In the closing paragraph of The Myth of Sisyphus, Sisyphus returns to his rock, treats fate as his own affair, and continues within a universe without a master or higher destiny. Immediately before the last sentence, Camus says that every atom of the stone forms a world and that the struggle toward the heights is enough to fill a human heart. “One must imagine Sisyphus happy” then ends the essay; the card no longer presents an added explanatory clause as source text.",
    distinction:
      "末句不是要求受苦者表演乐观，也没有说徒劳或痛苦本身就是善。它依赖全篇对荒诞、清醒和反抗的论证：幸福是在不诉诸虚假终极保证的情况下理解并承担自己的处境。旧卡关于清醒与行动占有的概括仍有解释价值，但只保留为编辑摘要。",
    englishDistinction:
      "The final sentence does not demand performed optimism from sufferers or call futility and pain good in themselves. It depends on the essay's argument about absurdity, lucidity, and revolt: happiness names understanding and taking up one's condition without a false ultimate guarantee. The former gloss about lucidity and ownership remains interpretively useful but is retained only as editorial summary.",
  },
  locke: {
    context:
      "《人类理解论》以追查观念的来源来反驳天赋观念说。洛克把心灵最初没有现成内容的状态作为起点，再区分感觉与反省两条经验来源，说明复杂观念如何由简单观念组合而成，并借此限定知识能够抵达的范围。",
    englishContext:
      "An Essay Concerning Human Understanding investigates the origin of ideas in order to reject the doctrine of innate ideas. Locke begins from a mind without ready-made contents, distinguishes sensation from reflection as two sources of experience, and explains how complex ideas are composed from simple ones, thereby marking the limits of knowledge.",
    distinction:
      "“白板”并不表示心灵毫无能力，也不等于人只是被环境书写。洛克否认的是与生俱来的现成观念；比较、抽象和组合等心智能力仍主动参与知识形成。",
    englishDistinction:
      "The blank slate does not mean that the mind lacks capacities or is merely written upon by its environment. Locke denies innate, fully formed ideas; mental powers such as comparison, abstraction, and combination remain active in forming knowledge.",
  },
  "locke-simple-ideas-received": {
    context:
      "固定的 1700 年第四版校订文本中，II.1.24 先把外物造成的感官印象及心灵对自身运作的反省称为全部知识的起点；II.1.25 随后说理解力“在这一部分”只是被动，说明对象会不由意志地带来观念，并以镜子比喻心灵不能拒收、改造或另造这些简单观念。卡片首句采用通行公版中第 25 节的标题式概括，省略号后回到本节正文。",
    englishContext:
      "In the fixed 1700 fourth-edition copytext, II.1.24 first locates the origin of knowledge in impressions from external objects and reflection on the mind's operations. II.1.25 then says that the understanding is passive “in this part”: objects impose ideas without awaiting the will, and the mirror comparison says that the mind cannot refuse, alter, erase, or replace these simple ideas. The card opens with the title-like summary of §25 used in a familiar public-domain presentation, then resumes the section's body after the ellipsis.",
    distinction:
      "被动只限定于简单观念的接受及其材料来源，不取消注意、反省、记忆、比较、组合与抽象等主动作用；镜子比喻在这里也没有证明观念必定精确复制外物。把这句话进一步解释成教育或环境单向决定全部信念，是项目延伸，不是本节结论。",
    englishDistinction:
      "Passivity is limited to receiving simple ideas and their materials; it does not cancel active attention, reflection, memory, comparison, combination, or abstraction. Nor does the mirror image here prove that ideas are exact copies of external objects. Reading the passage as saying that education or environment unilaterally determines every belief would be a project extension, not the section's conclusion.",
  },
  "locke-complex-ideas-made": {
    context:
      "固定的 1700 年第四版文本中，II.12.1 从简单观念的被动接受转到心灵把若干观念合看为一个复杂观念，II.12.2 又说这种重复和联结虽能远超当下所见的组合，却始终受限于感觉与反省已经给出的材料；II.12.3 再分出样式、实体与关系。卡片所列组合、并置与抽象三种行动属于《人类理解论》后来通行的文本状态，省略号压缩了版本层面的增补，不能当作登记的 1700 网页中一段连续省略。",
    englishContext:
      "In the fixed 1700 fourth-edition text, II.12.1 moves from passive reception of simple ideas to the mind's considering several ideas together as one complex idea. II.12.2 says that repetition and combination can range far beyond combinations presently observed, while remaining confined to materials already received from sensation and reflection; II.12.3 then distinguishes modes, substances, and relations. The card's explicit list of combining, juxtaposing, and abstracting belongs to a later familiar textual state of the Essay, so its ellipses telescope an edition-level expansion rather than a single continuous omission on the registered 1700 page.",
    distinction:
      "心灵的主动性不是从无创造材料：组合把观念合成一个，关系把观念并置而不合一，抽象则从现实伴随项中分离。三种操作也不表示每个复杂观念都可任意编造；洛克仍区分外物中观察到的结合与心灵自行构成的结合。旧卡关于相似经验形成不同思想的说明是解释性延伸。",
    englishDistinction:
      "The mind's activity does not create materials from nothing: combination unites ideas, relation places them together without making one, and abstraction separates them from accompanying features. These operations do not imply that every complex idea is fabricated at will; Locke still distinguishes combinations observed in things from those constructed by the mind. The card's point about similar experience yielding different thoughts is an interpretive extension.",
  },
  "locke-primary-secondary-qualities": {
    context:
      "固定的 1700 年第四版文本在 II.8.8 先区分心中的观念与对象中产生观念的性质；II.8.9—10 列出并以谷粒反复分割说明第一性质，II.8.11—13 再以接触、运动和不可感微粒说明身体如何作用，II.8.14 才把颜色、声音、滋味等界定为依赖第一性质而产生感觉的能力。卡片用省略号并置两组定义；在这个固定文本中它们并非第 9—10 节的连续句。",
    englishContext:
      "The fixed 1700 fourth-edition text first distinguishes an idea in the mind from a quality in an object at II.8.8. Sections 9–10 list primary qualities and illustrate their inseparability by repeatedly dividing a grain; II.8.11–13 then explains bodily operation through contact, motion, and insensible particles, and II.8.14 defines colors, sounds, and tastes as powers grounded in primary qualities that produce sensations. The card juxtaposes the two definitions with ellipses; in this fixed text they are not consecutive sentences in §§9–10.",
    distinction:
      "第二性质不是“完全不真实”或纯属个人随意投射：洛克把它们说成对象中真实的能力，只是这种能力所产生的颜色、声音等观念并不与物体中的微观结构相似。第一性质与第二性质的差别也不能单凭短引解决当代关于知觉关系的全部问题；卡片的现代追问属于项目延伸。",
    englishDistinction:
      "Secondary qualities are not wholly unreal or arbitrary personal projections. Locke treats them as real powers in objects, while denying that the ideas of color, sound, and the like resemble the microstructure that produces them. The short excerpt also cannot by itself settle every contemporary question about perceptual relations; the card's modern question is a project extension.",
  },
  "locke-nominal-real-essence": {
    context:
      "III.3.14 先把作为名称尺度和物种边界的抽象本质称为理解力的作品，并指出不同人可能收集不同特征。第 15 节随后区分两种用法：可发现性质所依赖、却通常未知的内部构造是真实本质；一般名称所代表、用来把事物归入种属的抽象观念是名义本质。卡片的省略号删去词源和经院哲学过渡，但保留了两种含义的次序；第 16 节又强调名称与名义本质的紧密联系。",
    englishContext:
      "III.3.14 first calls abstract essences—the measures of names and boundaries of species—the workmanship of the understanding, noting that different people may collect different features. Section 15 then distinguishes two senses: the generally unknown internal constitution on which discoverable qualities depend is real essence, while the abstract idea represented by a general name and used to sort things is nominal essence. The card's ellipses remove the etymology and scholastic transition but preserve the order of the two senses; §16 further stresses the close link between a name and nominal essence.",
    distinction:
      "名义本质不是一个毫无约束的标签，而是名称所表示、个体必须符合才会被归入该类的抽象观念；真实本质也不是凭先验直觉已经掌握的神秘核心，而是产生可发现性质、却往往仍未知的构造。把这一区分用于当代分类实践有启发性，但属于项目延伸。",
    englishDistinction:
      "Nominal essence is not an unconstrained label: it is the abstract idea signified by a name, to which particulars must conform to be sorted under it. Real essence is not a mysterious core already known by a priori insight, but the constitution producing discoverable qualities and often still unknown. Applying this distinction to contemporary classification is useful but remains a project extension.",
  },
  "locke-labor-and-property": {
    context:
      "《政府论》下篇第五章第 25—26 节先从世界为人类共同使用及物品必须经过某种占有才能被利用说起。第 27 节以个人对自身及其劳动的权利说明占有：卡片省略的中段正是把对象移出自然共有状态、混入劳动并附加自身之物的机制，保留的结尾则包含“为他人留下足够多且同样好”的条件。第 31 节另加不浪费限制，第 46—50 节才讨论货币如何扩大并使不平等占有成为可能。",
    englishContext:
      "Chapter V, §§25–26 begins from the world's common use and the need for some appropriation before goods can benefit particular people. Section 27 grounds appropriation in one's person and labor: the card's omitted middle is precisely the mechanism of removing something from nature's common state, mixing labor with it, and annexing what is one's own, while the retained ending includes the condition of leaving enough and as good for others. Section 31 separately adds the spoilage limit, and §§46–50 later explain how money permits enlarged and unequal holdings.",
    distinction:
      "这段话没有说只要付出劳动就能对任何对象取得无限权利，也不能单独为现代雇佣成果、数据或知识产权定案。旧卡所说“不浪费”来自后续第 31 节，而货币与不平等积累来自更后面的论证；把“足够且同样好”转化为今日的机会与资源标准，是明确的项目延伸。",
    englishDistinction:
      "The passage does not say that any expenditure of labor yields unlimited title to any object, and it cannot by itself decide modern cases involving employment, data, or intellectual property. The former card's non-waste point comes from the later §31, while money and unequal accumulation enter still later. Translating “enough, and as good” into present-day standards of opportunity and resources is an explicit project extension.",
  },
  "hume-missing-shade": {
    context:
      "《人类理解研究》E 2.7 刚以盲者不能形成颜色观念等例子支持观念来自相应印象的规则；E 2.8 随即把缺失的蓝色深浅称为一个相反现象。卡片省略的中段要求把除一种之外的蓝色从深到浅排列，使当事人看见空缺并察觉相邻颜色间距异常，随后才接上“我问”与想象补缺。卡片结束后，休谟又称此例极其特殊，不值得仅为它改变一般准则；E 2.9 随即恢复用印象检验观念的办法。",
    englishContext:
      "E 2.7 has just supported the rule that ideas derive from corresponding impressions by noting, for example, that a blind person forms no notion of colors. E 2.8 then introduces the missing shade as a contradictory phenomenon. The card's omitted middle arranges every other shade from deepest to lightest so that the person perceives a blank and an unusually large interval between neighboring colors; only then does the text resume with “Now I ask” and the imagined completion. After the card stops, Hume calls the instance singular and not worth changing the general maxim for by itself; E 2.9 immediately resumes the method of testing ideas by their impressions.",
    distinction:
      "这个例外没有证明天赋观念，也没有赋予想象力任意制造全新简单观念的普遍能力；补出的深浅依赖已经经验过的相似色彩及其渐变秩序。休谟承认一个狭窄反例，同时继续把摹本原则当作一般方法。旧卡关于“理论诚实”的评价是对这种处理方式的编辑性延伸。",
    englishDistinction:
      "The exception proves neither innate ideas nor a general power of imagination to invent arbitrary new simple ideas. Supplying the shade depends on experienced neighboring colors and their ordered resemblance. Hume grants a narrow counterexample while retaining the copy principle as his general method. The card's praise of theoretical honesty is an editorial extension from that handling of the case.",
  },
  hegel: {
    context:
      "《精神现象学》追踪意识从感性确定性到绝对知的不同形态。每一种形态都按自己的真理标准行动，却在经验中暴露出内部不一致，由此被迫改造自身。所谓穿过矛盾，指的正是意识在这种自我检验中完成转变。",
    englishContext:
      "Phenomenology of Spirit follows successive shapes of consciousness from sense-certainty toward absolute knowing. Each shape acts according to its own criterion of truth, yet experience exposes an inconsistency within that criterion and compels consciousness to transform itself. Passing through contradiction names this process of self-testing change.",
    distinction:
      "黑格尔的矛盾不是任意意见冲突，也不是“正题—反题—合题”的机械公式。关键是一个立场依照自身标准便产生无法维持的结果，而新形态既否定又保存此前所得。",
    englishDistinction:
      "Hegelian contradiction is neither any clash of opinions nor a mechanical thesis-antithesis-synthesis formula. A position becomes untenable by its own standards, and the succeeding shape both negates and preserves what the earlier one achieved.",
  },
  kierkegaard: {
    context:
      "这句话见于克尔凯郭尔的日记写作，面对的是存在者无法站到自己生命之外预先掌握全局的处境。经历往往要在后来才能显出关联，但当下的选择仍必须在证据不足、结果未明时作出，个体也因此承担成为自己的责任。",
    englishContext:
      "This thought appears in Kierkegaard's journals and addresses the condition of an existing person who cannot stand outside life and survey it in advance. Experiences often disclose their connections only afterward, yet choices must still be made amid incomplete evidence and uncertain results, leaving the individual responsible for becoming a self.",
    distinction:
      "“向后理解”不是说事后必能发现一条命定路线，“向前生活”也不是鼓励冲动。它指出解释具有回顾性，而决定无法等到绝对确定；选择仍需理由，却没有全知视角作保证。",
    englishDistinction:
      "Understanding backward does not promise that hindsight will reveal a predestined path, and living forward does not endorse impulsiveness. Interpretation is retrospective, while decision cannot await absolute certainty; choices still require reasons, but no omniscient viewpoint guarantees them.",
  },
  anscombe: {
    context:
      "〈现代道德哲学〉开篇先列出三项主张。卡片短引来自第二项主张的同一句中；被省略的句首列举义务、责任、道德上的正误与道德意义的‘应当’诸概念，因此 them 正是回指这些概念。分号后的 because 从句随即说明，它们是较早伦理观念的遗存或其衍生物。",
    englishContext:
      "Modern Moral Philosophy opens by announcing three theses. The card excerpt comes from the sentence stating the second; its omitted opening lists concepts of obligation, duty, moral right and wrong, and the moral sense of ‘ought,’ which are the referent of ‘them.’ The clause after the semicolon immediately calls them survivals, or derivatives from survivals, of an earlier conception of ethics.",
    distinction:
      "安斯康姆没有要求摒弃伦理研究、一切日常的‘应当’，或所有评价词。她针对的是带有特殊道德法律力量的概念；开篇第一项主张另说，在形成充分的心理哲学之前，当前做道德哲学并无益处。",
    englishDistinction:
      "Anscombe is not proposing to discard ethical inquiry, every ordinary use of ‘ought,’ or all evaluative language. Her target is the concepts carrying a distinctive moral-law force; the separate first thesis says that doing moral philosophy is unprofitable until an adequate philosophy of psychology has been developed.",
  },
  "anscombe-against-consequentialism": {
    context:
      "原刊第11—12页先批评西季威克在责任问题上取消‘预见’与‘有意’后果的区别，并把由此形成的路线命名为 consequentialism。卡片完整句紧接这段历史判断，开启她以伦理边界案例和诡辩法来说明‘浅薄’之意的段落。",
    englishContext:
      "On original pp. 11–12, Anscombe first criticizes Sidgwick for denying a distinction, for purposes of responsibility, between foreseen and intended consequences, and names the resulting tendency ‘consequentialism.’ The card's complete sentence immediately follows that genealogy and opens her explanation of ‘shallow’ through ethical borderline cases and casuistry.",
    distinction:
      "这是安斯康姆针对她所命名路线的论战性判断，不是对后来所有自称后果主义理论的中性定义。旧卡关于有意行为与副作用的说明作为编辑摘要保留，并把此前不准确的‘不可预见’收窄为原文语境中的‘可预见但非有意’。",
    englishDistinction:
      "This is Anscombe's polemical judgment about the tendency she names, not a neutral definition of every later theory called consequentialist. The former explanation contrasting intentional action with a side effect remains as an editorial summary, with the earlier inaccurate ‘unforeseeable’ narrowed to the source's ‘foreseen but unintended.’",
  },
  "anscombe-intention-why": {
    context:
      "《意向》第 5 节从“哪些行动是有意的”这一问题入手。卡片短引位于安斯康姆的答案句中；原句在分号后立即限定，这里的“为什么”是肯定回答会给出行动理由的那种意义。第 6—8 节又通过拒答、原因与证据等情况继续划定适用边界。",
    englishContext:
      "Section 5 of Intention begins by asking which actions are intentional. The card's short excerpt comes from Anscombe's answer; immediately after the semicolon, the sentence specifies the sense of “Why?” in which a positive answer gives a reason for acting. Sections 6–8 further test its application through refusals, causes, and evidence.",
    distinction:
      "不是任何可以追问“为什么”的事件都因此成为有意行动，同一行动也并非在所有描述下都同样有意。关键是这种特殊的理由询问是否适用于相关描述；卡片短引没有把分号后的限定冒充成已经引出的文字。",
    englishDistinction:
      "Not every event about which one can ask why is therefore intentional, and the same action need not be intentional under every description. What matters is whether this special reason-seeking question applies under the relevant description; the card does not present the qualification after the semicolon as part of its excerpt.",
  },
  "anscombe-directions-of-fit": {
    context:
      "《意向》第 32 节把购物者手中的清单与跟踪他的侦探所写记录并置：购物偏离清单时，错误可能在执行；记录偏离实际购买时，错误则在记录。卡片只取后一个对照句的结果分句。安斯康姆紧接着提醒，缺货或改变主意也会造成清单与购买不一致。",
    englishContext:
      "Section 32 of Intention contrasts a shopper's list with the record made by a detective following him: when shopping departs from the list, the mistake may lie in performance; when the record departs from what was bought, the mistake lies in the record. The card retains only the consequent of the latter comparison. Anscombe immediately adds that unavailable goods or a change of mind can also produce a mismatch.",
    distinction:
      "“符合方向”是后来用来概括这个例子的术语，不是卡片所引分句中的原词。例子也没有断言一切清单偏差都是行动者犯错；旧卡的双向说明因此作为编辑摘要保留，而不冒充逐字引文。",
    englishDistinction:
      "“Direction of fit” is a later label for the contrast, not wording in the excerpt. Nor does the example say that every departure from a list is the agent's mistake; the former two-direction explanation is therefore retained as an editorial summary rather than presented as a quotation.",
  },
  "anscombe-practical-knowledge": {
    context:
      "《意向》第 48 节把已执行的意图与行动者对自己正在做什么的知识合在一起讨论，随后援引阿奎那对实践知识的说明。完整原句把“作为所理解之物的原因”的实践知识，与“源自已知对象”的思辨知识对照；卡片只保留前一个最小命题。",
    englishContext:
      "Section 48 of Intention brings together executed intentions and the agent's knowledge of what she is doing, then invokes Aquinas's account of practical knowledge. The full source sentence contrasts practical knowledge as the cause of what it understands with speculative knowledge derived from known objects; the card retains only the first, minimal proposition.",
    distinction:
      "这里的“原因”不能直接等同于一次必然成功的心理推动，也不意味着行动者永远不会出错或完全不需感官引导。安斯康姆在同一讨论中承认执行失误；实践知识的因果地位仍需放在意图组织行动的语境中理解。",
    englishDistinction:
      "“Cause” here should not be reduced to an infallible mental push, nor does it imply that agents never err or never need sensory guidance. Anscombe allows for mistakes in performance in the same discussion; practical knowledge's causal role belongs to the way intention organizes action.",
  },
  "arendt-power-together": {
    context:
      "《论暴力》第二部分先反对把权力、力量、强力、权威与暴力都压缩成“谁支配谁”的同义词，随后逐项给出区分。卡片是“权力”定义的首句；接下来的句子说明权力属于群体，只在群体保持联合时存在，而“掌权者”是受一定人数授权代其行动。",
    englishContext:
      "Part II of On Violence first rejects the reduction of power, strength, force, authority, and violence to synonymous answers to who rules whom, then distinguishes them in turn. The card is the first sentence of the definition of power; the following sentences say that power belongs to a group, lasts only while the group keeps together, and that someone “in power” is empowered by a number of people to act in their name.",
    distinction:
      "“共同行动”是阿伦特在这组区分中的政治概念，不等于所有聚集、服从或多数决定都自动正当，也不表示制度与物质条件无关。集体能力的存在与其目标是否正义，仍是不同问题。",
    englishDistinction:
      "“Act in concert” is Arendt's political category within this taxonomy; it does not make every gathering, obedience, or majority decision automatically legitimate, nor does it render institutions and material conditions irrelevant. The existence of collective capacity and the justice of its ends remain different questions.",
  },
  "arendt-violence-instrument": {
    context:
      "在《论暴力》第二部分的同一组术语区分中，“暴力”定义紧随权力、力量、强力与权威之后。卡片保留定义首句的最小句末分句；下一句说明暴力工具像其他工具一样放大自然力量，书中后文才进一步讨论暴力的正当化与权力的正当性。",
    englishContext:
      "Within the same taxonomy in Part II of On Violence, the definition of violence follows those of power, strength, force, and authority. The card keeps the minimal sentence-final clause of its opening definition; the next sentence says that the implements of violence multiply natural strength, while later passages separately discuss the justification of violence and the legitimacy of power.",
    distinction:
      "“工具性”本身不等于每一次暴力都非理性或绝不可能得到辩护。旧卡所说暴力不能凭自身生成持久正当性，是依据书中更广对照作出的编辑摘要，不是这个六词短引单独已经证明的结论。",
    englishDistinction:
      "Instrumentality alone does not make every use of violence irrational or incapable of justification. The former claim that violence cannot by itself generate lasting legitimacy is an editorial synthesis from the book's broader contrast, not a conclusion established by this six-word excerpt alone.",
  },
  "arendt-factual-truth": {
    context:
      "〈真理与政治〉第二部分先说，事实与意见虽须分开，却属于同一领域：事实为意见提供信息，而立场不同的意见只要尊重事实真理，仍可同样正当。卡片所引完整句随后给出意见自由的事实条件；下一句再把事实真理之于政治思想类比为理性真理之于哲学思辨。",
    englishContext:
      "Part II of ‘Truth and Politics’ first says that facts and opinions must be kept apart yet belong to the same realm: facts inform opinions, and divergent opinions can remain legitimate when they respect factual truth. The card's complete sentence then states a factual condition of free opinion; the next sentence compares factual truth's authority for political thought with rational truth's authority for philosophical speculation.",
    distinction:
      "这句话并未断言历史事实无需选择、解释或视角，也没有说所有政治分歧都能靠数据消除。紧接的段落明确提出历史书写中的选择与解释难题，同时拒绝把这些难题当作操纵事实、模糊事实与意见界线的许可。",
    englishDistinction:
      "The sentence does not claim that historical facts need no selection, interpretation, or perspective, nor that data can dissolve every political disagreement. The following paragraph explicitly raises problems of selection and interpretation while denying that they license manipulating facts or blurring the line between fact and opinion.",
  },
  "arendt-thoughtlessness": {
    context:
      "这句话在1964年修订增补版的后记，而不是结语。阿伦特回应‘平庸’副标题引发的争议：前一句说艾希曼并不愚蠢，且从未意识到自己在做什么；后文则说这并不等于把现象称为普通，并指出远离现实与无思可能造成巨大破坏。",
    englishContext:
      "The sentence occurs in the Postscript of the 1964 revised and enlarged edition, not in the Epilogue. Arendt is answering controversy over the subtitle ‘banality’: the preceding line says Eichmann was not stupid and never realized what he was doing; what follows denies that this makes the phenomenon commonplace and says that remoteness from reality and thoughtlessness can wreak enormous havoc.",
    distinction:
      "无思在这里明确不等同于愚蠢，也不是无罪、没有责任或‘只是服从’的免责理由。短引首先是阿伦特对艾希曼这一被告的判断；旧卡把它扩展为严重恶如何传播的命题，因此只作为紧邻评论的编辑摘要，而不冒充原句的普遍结论。",
    englishDistinction:
      "Thoughtlessness here is explicitly not stupidity, innocence, absence of responsibility, or an excuse based on ‘mere obedience.’ The excerpt is first a judgment about Eichmann as the defendant; the former card generalizes it into a claim about how grave evil spreads, so that statement remains adjacent commentary rather than a universal conclusion attributed to the quoted sentence.",
  },
  "arendt-disclosure-who": {
    context:
      "《人的境况》第五章第24节讨论行动者如何在言说与行动中显露。卡片保留原句开头；被省略的后半句把这种主动显露与身体形状、声音无须行动便出现的物理身份对照。下一句随即区分一个人‘是谁’与其品质、天赋、才能和缺点所说明的‘是什么’。",
    englishContext:
      "Chapter V, §24 of The Human Condition examines how an agent is disclosed in speech and action. The card retains the opening of the sentence; its omitted continuation contrasts this active disclosure with physical identity appearing without activity in bodily shape and voice. The next sentence then distinguishes ‘who’ someone is from the qualities, gifts, talents, and shortcomings that say ‘what’ someone is.",
    distinction:
      "这里的 who 不是一份隐藏本质、履历标签或可以完全策划的个人品牌。它在与他人共同展开的行动关系及其故事中显现，甚至可能对行动者本人保持隐蔽；原文的 men 是该版时代用语，项目中译按泛指人来理解。",
    englishDistinction:
      "The ‘who’ is not a hidden essence, résumé label, or personal brand one can fully stage. It appears within relations of action and stories shared with others and may remain concealed from the actor; the edition's period term ‘men’ is understood generically in the project translation.",
  },
  "arendt-labor-work-action": {
    context:
      "《人的境况》第二版第一章第1节以卡片所取的完整句界定 vita activa 的讨论范围。紧接的三段分别说明：劳动对应身体的生命过程，工作提供相对持久的人工世界，行动则不以物为中介、直接发生在人与人之间，并以复数性为条件；第三至第五章再分别展开三种活动。旧卡“维持—建造—开启”的三联表述综合了这些后文，因此保留为编辑摘要。",
    englishContext:
      "Chapter I, §1 of the second edition of The Human Condition opens its account of the vita activa with the card's complete sentence. The next three paragraphs say respectively that labor corresponds to the body's life process, work provides a relatively durable artificial world, and action occurs directly between people without the intermediary of things and corresponds to plurality; Chapters III–V then develop the three activities separately. The former sustaining-building-beginning triad synthesizes that later material and therefore remains an editorial summary.",
    distinction:
      "“基本”首先表示每种活动都对应人在地球上生活的一项基本条件，并不是把三者按道德价值排成固定等级，也不是说人的一切能力都已穷尽；序言明确说思考被留在本书范围之外。把三者用于今日时间管理，以及“效率吞没公共自由”的提醒，是项目延伸，不是这17词定义句单独给出的结论。",
    englishDistinction:
      "“Fundamental” first means that each activity corresponds to a basic condition of earthly human life; it does not by itself rank the three morally or exhaust every human capacity, and the Prologue expressly leaves thinking outside the book's scope. Applying the distinction to present-day time management, or warning that efficiency can consume public freedom, is a project extension rather than a conclusion contained in this seventeen-word definition alone.",
  },
  "arendt-public-private": {
    context:
      "《人的境况》第二章先分析公共领域的两种意义：在众人面前显现，以及由不同位置共同指向同一世界。卡片完整句位于第9节末部，正从隐私一侧重述公私区分；后文紧接着说，现代亲密性显示了隐藏领域的丰富，并回顾身体与生命必需如何历史性地被留在私域。旧卡“多重位置的共同世界”综合了本章前文，因此保留为编辑摘要。",
    englishContext:
      "Chapter II of The Human Condition first analyzes two senses of the public realm: appearing before others and sharing one world seen from different positions. The card's complete sentence occurs near the end of §9 and restates the public-private distinction from the side of privacy. Arendt immediately turns to the richness of the hidden under modern intimacy and to the historical concealment of bodily and life necessities. The former card's ‘common world from many positions’ synthesizes earlier passages in the chapter and is therefore retained as an editorial summary.",
    distinction:
      "原句不是说一切私人事项都因羞耻而必须隐藏，也不把公共直接等同于政府或媒体曝光。这组区分嵌在阿伦特对古代城邦、家户与现代社会的历史性论述中；用它直接制定当代隐私政策，仍是项目延伸。",
    englishDistinction:
      "The sentence does not say that every private matter must be hidden out of shame, and it does not equate the public directly with government or media exposure. The distinction belongs to Arendt's historical account of the ancient polis, household, and modern society; turning it directly into a contemporary privacy policy remains a project extension.",
  },
  "arendt-plurality": {
    context:
      "《人的境况》第五章第24节以卡片所取的完整句开始。接下来阿伦特分别展开两端：若人不平等，就不能彼此理解、理解前人或为后人计划；若人不相区别，单用表示相同需求的信号便足够，无须言说与行动。第176页进一步把人的复数性说成“独一存在者的复数性”。",
    englishContext:
      "Chapter V, §24 of The Human Condition opens with the card's complete sentence. Arendt then unfolds both sides: without equality, people could not understand one another, their predecessors, or plan for successors; without distinction, signals for identical needs would suffice and neither speech nor action would be needed. Print p. 176 further calls human plurality ‘the paradoxical plurality of unique beings.’",
    distinction:
      "平等不是把人磨成相同，“差异”也不只是人口特征的多样。阿伦特谈的是言说与行动得以发生的双重条件；旧卡把它直接说成“政治的条件”，以及将其应用于团队管理，都是明示的编辑延伸。",
    englishDistinction:
      "Equality does not grind people into sameness, and ‘distinction’ is not merely demographic diversity. Arendt is identifying the twofold condition under which speech and action occur. The former card's direct formulation as a condition of politics, and its application to team practice, are explicit editorial extensions.",
  },
  "arendt-forgiveness": {
    context:
      "《人的境况》第五章第33节把行动的两种困境与两种内在能力配对：宽恕应对不可逆，承诺应对不可预测。卡片完整句位于印刷页237；同页随后说，两种能力都依赖复数性与他人的在场，因为人无法只向自己实现宽恕或承诺的现实效力。第240—241页又以日常过失、复仇与惩罚界定其边界。",
    englishContext:
      "Chapter V, §33 of The Human Condition pairs two predicaments of action with two capacities inherent in action: forgiveness addresses irreversibility, while promising addresses unpredictability. The card's complete sentence appears on print p. 237; the same page says both faculties depend on plurality and the presence of others, since forgiveness or promises enacted only toward oneself lack worldly reality. Print pp. 240–241 then mark boundaries through everyday trespass, vengeance, and punishment.",
    distinction:
      "宽恕在这里不是否认行为已发生，也不是取消判断、惩罚或责任。阿伦特明说，惩罚是宽恕的替代而非反面，并把极端罪行与故意之恶排除在日常宽恕的范围外。旧卡加入“追责之外”和不让一次行为锁定全部身份的说法，是依据本节更广论述作出的项目延伸。",
    englishDistinction:
      "Forgiveness here neither denies that a deed occurred nor cancels judgment, punishment, or responsibility. Arendt explicitly calls punishment an alternative to forgiveness rather than its opposite and excludes extreme crime and willed evil from the scope of ordinary forgiveness. The former card's language of accountability and of not fixing a whole identity by one deed is a project extension drawn from the section's broader argument.",
  },
  "arendt-right-to-rights": {
    context:
      "《极权主义的起源》第二部分第9章第二节先区分失去某项公民权利与彻底无权状态。印刷页296指出，无国籍者甚至可能仍有人身安全、行动或意见自由，但若没有任何共同体及法律把他们的言行当作可归责、可回应之事，这些自由便不构成权利。卡片完整句随即把根本剥夺定位为失去“在世界上的一个位置”；跨至第297页的下一句才明确说出“拥有权利的权利”，并把它解释为生活在按言行判断人的框架中、属于某种有组织共同体的权利。",
    englishContext:
      "Part II, Chapter 9, §II of The Origins of Totalitarianism first distinguishes losing particular civil rights from complete rightlessness. On print p. 296, Arendt notes that stateless people may retain physical safety, movement, or freedom of opinion, yet these do not amount to rights when no community and law treat their words and deeds as answerable and consequential. The card's complete sentence locates the fundamental deprivation in losing ‘a place in the world’; the following sentence, crossing to p. 297, explicitly names ‘a right to have rights’ and glosses it as living in a framework where one is judged by actions and opinions and belonging to an organized community.",
    distinction:
      "“拥有权利的权利”不只是抽象的道德价值，也不等于无条件服从任一现存民族国家。论证强调的是一个愿意且能够保障权利、让言行具有制度效力的政治位置；第298—299页又承认由“人类本身”保障这种权利是否可能并不确定，世界政府也不会自动解决难题。旧卡把邻近数段压缩为“最根本的权利”，因此作为编辑摘要保留。",
    englishDistinction:
      "The ‘right to have rights’ is neither only an abstract moral worth nor unconditional submission to any existing nation-state. The argument concerns a political standing in a community willing and able to guarantee rights and make speech and action institutionally consequential. Print pp. 298–299 then says it is uncertain whether humanity itself can guarantee this right and that world government would not automatically solve the problem. The former card compresses these neighboring paragraphs into ‘the most basic right’ and is therefore retained as an editorial summary.",
  },
  "arendt-loneliness": {
    context:
      "《极权主义的起源》第三部分第13章先把孤立与孤独分开：孤立摧毁共同政治行动，孤独则侵入人的全部生活，使人感到完全不属于世界。印刷页475—476又把孤独同独处区分；独处仍有“二合一”的自我对话，并通过他人在思想中的代表而与共同世界相连。卡片完整句位于第477页，随后说人在孤独中同时失去对作为思想伙伴的自己的信任，以及形成经验所需的世界信心；第478页才把已成大众日常经验的孤独明确称为极权统治在非极权世界中的准备条件。",
    englishContext:
      "Part III, Chapter 13 of The Origins of Totalitarianism first separates isolation from loneliness: isolation destroys common political action, while loneliness invades life as a whole and is the experience of not belonging to the world at all. Print pp. 475–476 then distinguish loneliness from solitude; solitude preserves the two-in-one dialogue of the self and remains related to a common world through others represented in thought. The card's complete sentence appears on p. 477. Arendt next says that loneliness destroys trust in oneself as a partner in thought and confidence in the world needed for experience; p. 478 then explicitly identifies mass, everyday loneliness as preparation for totalitarian domination in the non-totalitarian world.",
    distinction:
      "孤独不等于身体独处、暂时退隐或一般社交不足；阿伦特甚至说它会在与他人同处时最尖锐地显现。卡片原句本身说明自我同一性为何需要可信赖的平等者确认，但“极权统治需要这种孤独”来自本章更广论证，故旧卡作为编辑摘要保留。把这种分析直接转成任何一种社群方案或心理治疗建议，仍是项目延伸。",
    englishDistinction:
      "Loneliness is not bodily aloneness, temporary withdrawal, or a generic shortage of social contact; Arendt says it can appear most sharply in company with others. The selected sentence explains why self-identity needs confirmation by trustworthy equals, while the claim that totalitarian rule needs such loneliness comes from the chapter's broader argument and therefore remains an editorial summary. Converting the analysis directly into a community program or therapeutic prescription is a project extension.",
  },
  "arendt-ideology-logic": {
    context:
      "《极权主义的起源》第三部分第13章在印刷页470—471列出意识形态思维的三项极权要素：声称总体解释历史过程、摆脱可感经验，以及把事实排成从公理式前提展开的绝对逻辑程序。卡片完整句结束第三项：一旦从经验中取出的唯一一点被变成前提，后续推演便不再受新经验干扰。第472—474页接着说明希特勒与斯大林如何把这种逻辑性推到行动极端，并以害怕自相矛盾的内在强制压制开始新思想的能力。",
    englishContext:
      "Part III, Chapter 13 of The Origins of Totalitarianism lists three totalitarian elements of ideological thinking on print pp. 470–471: a claim to total explanation of historical process, emancipation from sensible experience, and the ordering of facts into an absolutely logical procedure from an axiomatic premise. The card's complete sentence closes the third element: once the one point taken from experience becomes a premise, later deduction is insulated from further experience. Print pp. 472–474 then show Hitler and Stalin driving this logicality into action and using the inward fear of self-contradiction to suppress the capacity to begin a new thought.",
    distinction:
      "阿伦特批评的不是形式逻辑、演绎或一致性本身。危险在于把一个前提从经验校验中封闭起来，再让逻辑链服务于声称预知整个历史或自然运动的意识形态与恐怖统治。旧卡所说“让演绎一致性压过反证”是对本段机制的准确编辑概括，但并非原句逐字措辞；把它用于日常信念复盘是项目延伸。",
    englishDistinction:
      "Arendt is not attacking formal logic, deduction, or consistency as such. The danger lies in sealing a premise off from experiential correction and then making its chain serve an ideology that claims to know the whole movement of history or nature under terror. The former card's language of deductive consistency overruling counterevidence accurately summarizes the mechanism but is not the wording of the selected sentence; applying it to everyday belief revision is a project extension.",
  },
  husserl: {
    context:
      "《纯粹现象学通论》以现象学悬置改变研究态度：暂不使用自然态度中关于外部世界独立存在的默认断言，转而描述对象如何在意识经验中被给予。由此可考察知觉、记忆与想象各自的显现结构及其意义构成。",
    englishContext:
      "Ideas I changes the stance of inquiry through the phenomenological epoché: it provisionally withholds the natural attitude's default assertion that the external world exists independently, and instead describes how objects are given in conscious experience. This makes it possible to examine the structures of perception, memory, imagination, and the constitution of meaning.",
    distinction:
      "悬置不是否认世界存在，也不是要求清空语言、情绪和知识。它暂停对存在问题的直接裁决，以便更严格地观察经验如何呈现对象；这是一种方法性的转向，而非怀疑论结论。",
    englishDistinction:
      "Epoché neither denies that the world exists nor asks us to empty ourselves of language, emotion, or knowledge. It suspends a direct verdict on existence so that the way experience presents objects can be examined more rigorously; it is a methodological shift, not a skeptical conclusion.",
  },
  derrida: {
    context:
      "《论文字学》批判把声音、在场和单一源头置于文字之上的逻各斯中心传统。德里达借踪迹、补充等分析说明，一个符号之所以可理解，总依赖它与其他符号的差异以及可被移入新语境的重复性，因此意义无法由孤立词项封闭。",
    englishContext:
      "Of Grammatology criticizes the logocentric tradition that privileges voice, presence, and a single origin over writing. Through analyses of trace and supplement, Derrida shows that a sign is intelligible only through its differences from other signs and its repeatability in new contexts, so meaning cannot be sealed within an isolated term.",
    distinction:
      "延异不等于意义任意，也不表示文本没有较好或较差的解释。解构要求细读文本怎样建立等级、依赖被排除的概念并产生超出作者控制的效果，解释仍须接受文字和语境证据的约束。",
    englishDistinction:
      "Différance does not make meaning arbitrary or eliminate better and worse interpretations. Deconstruction closely reads how a text builds hierarchies, depends on excluded concepts, and produces effects beyond authorial control; interpretation remains constrained by textual and contextual evidence.",
  },
  nussbaum: {
    context:
      "《创造能力》把能力进路发展为评价社会正义与生活质量的框架。与只比较财富、效用或名义权利不同，它追问每个人在身体条件、社会制度和环境支持之下，实际上拥有实现若干核心生活方式的机会与自由。",
    englishContext:
      "Creating Capabilities develops the capabilities approach as a framework for evaluating social justice and quality of life. Rather than comparing wealth, utility, or formal rights alone, it asks what genuine opportunities and freedoms each person has to realize central forms of human life under their bodily conditions, social institutions, and environmental supports.",
    distinction:
      "能力不同于已经完成的“功能”：前者是可选择的真实机会，后者是实际做到的状态。保障能力不是强迫所有人采用同一种生活，而是让选择不因贫困、歧视或障碍而沦为空名。",
    englishDistinction:
      "A capability differs from an achieved functioning: the former is a genuine opportunity one may choose, while the latter is a realized state of being or doing. Securing capabilities does not force one way of life on everyone; it keeps choice from becoming nominal because of poverty, discrimination, or disability.",
  },
  socrates: {
    context:
      "《申辩篇》38a 位于苏格拉底受审并提出替代刑罚的段落。他为在雅典持续诘问自己与他人的生活方式辩护，认为关于德性、正义与善的说法必须经受共同检验；放弃这种检验，便等于放弃他理解的人的使命。",
    englishContext:
      "Apology 38a occurs during Socrates' trial, in the passage where he discusses an alternative penalty. He defends his practice of continually questioning himself and fellow Athenians, holding that claims about virtue, justice, and the good must withstand shared examination; abandoning that examination would mean abandoning the human vocation as he understands it.",
    distinction:
      "省察不是无休止地分析个人情绪，也不是认定只有知识分子的生活才有价值。苏格拉底式省察依靠对话、追问理由和承认无知，使行动依据能够公开接受反驳。",
    englishDistinction:
      "Examination is not endless analysis of private feelings, nor a claim that only an intellectual's life has value. Socratic examination proceeds through dialogue, demands reasons, and acknowledges ignorance, making the grounds of action publicly answerable to challenge.",
  },
  plato: {
    context:
      "《理想国》第七卷518b—d 接续洞穴寓言讨论教育。柏拉图认为学习能力已存在于灵魂之中，教育者不能像向盲眼灌入视力那样塞入知识，而应使整个灵魂由生成变化的事物转向可知者与善，并学习承担公共责任。",
    englishContext:
      "Republic VII, 518b-d follows the allegory of the cave with an account of education. Plato argues that the capacity to learn is already present in the soul: educators cannot insert knowledge as though putting sight into blind eyes, but must turn the whole soul from changing things toward intelligible reality and the good, while preparing it for public responsibility.",
    distinction:
      "“转向”不是拒绝事实知识，也不是等待一次神秘顿悟。它要求欲望、习惯和判断标准共同改变；看见洞外之后仍须学习辨认对象，并面对返回共同世界的政治义务。",
    englishDistinction:
      "Turning is neither a rejection of factual knowledge nor passive waiting for a mystical insight. It requires desires, habits, and standards of judgment to change together; after leaving the cave, one must still learn to discern what is seen and confront the political duty of returning to the shared world.",
  },
  kant: {
    context:
      "《道德形而上学奠基》第二章4:421 给出目的自身公式。康德从理性存在者能够为自己立法出发，主张行动时必须把自己和他人的人性同时视为目的；这一要求为道德义务提供不依赖个人偏好的普遍限制。",
    englishContext:
      "Groundwork II, 4:421 presents the formula of humanity as an end in itself. Beginning from rational beings' capacity to legislate for themselves, Kant argues that action must treat humanity, in oneself and others, always at the same time as an end; this places a universal limit on conduct independent of personal preference.",
    distinction:
      "康德禁止的是把人“仅仅”当作手段，并非禁止雇佣、合作或彼此利用服务。关键在于是否尊重对方知情同意与自主目的，而欺骗和强迫使对方无法真正参与行动准则。",
    englishDistinction:
      "Kant forbids treating a person merely as a means, not employment, cooperation, or reciprocal use of services. The issue is whether another's informed consent and autonomous ends are respected; deception and coercion prevent that person from genuinely sharing in the principle of action.",
  },
  "marx-change-world": {
    context:
      "《关于费尔巴哈的提纲》第十一条总结此前对旧唯物主义的批评。马克思认为人的认识并非站在社会实践之外观看对象，理论本身也介入现实关系；检验理解不能只看解释是否自洽，还要看它怎样进入改变条件的共同实践。",
    englishContext:
      "Thesis XI of the Theses on Feuerbach condenses Marx's preceding critique of earlier materialism. Human knowing does not observe objects from outside social practice; theory itself participates in real relations. Understanding must therefore be tested not only for explanatory coherence but also by how it enters collective practice that transforms conditions.",
    distinction:
      "“改变世界”不是让行动取代理论，更不是为任何自称实践的力量背书。提纲反对的是把解释与行动割裂；有效实践仍需要具体分析，而理论也要接受其现实后果的检验。",
    englishDistinction:
      "Changing the world does not replace theory with action or endorse every force that calls itself practical. The thesis rejects the separation of interpretation from action: effective practice still requires concrete analysis, while theory must answer to its consequences in reality.",
  },
  "nietzsche-perspectival-knowing": {
    context:
      "《论道德的谱系》第三篇第12节讨论认识中的视角性。尼采反对一种无欲望、无立场的纯粹主体理想，转而把客观性理解为能够调动更多不同的眼睛和情感解释同一事物，并比较这些解释各自照亮与遮蔽之处。",
    englishContext:
      "On the Genealogy of Morality, Third Essay, section 12 addresses the perspectival character of knowing. Nietzsche rejects the ideal of a pure subject without desire or standpoint, redefining objectivity as the capacity to bring more distinct eyes and affects to bear on one thing and compare what each interpretation illuminates or conceals.",
    distinction:
      "视角主义不是“人人都有自己的真相”。视角有范围、解释力和诚实程度的差别，也能相互校正；承认立场性是为了扩大观察能力，而不是取消证据与批判。",
    englishDistinction:
      "Perspectivism is not the claim that everyone has a private truth. Perspectives differ in scope, explanatory power, and honesty, and can correct one another; acknowledging standpoint is meant to enlarge the capacity to see, not abolish evidence and criticism.",
  },
  frege: {
    context:
      "〈论涵义与指称〉从 a=a 与真实的 a=b 可能具有不同认知价值这一难题出发，并以同一对象的不同“呈现方式”引出涵义与指称之分。结尾段回到起点：若 a=b，两句的指称同为同一个真值；但 b 的涵义仍可能不同于 a，于是两句表达的思想也不同。卡片完整句中的“在这种情况下”正回指这个条件。",
    englishContext:
      "‘On Sense and Reference’ begins from the puzzle that a=a and a true a=b may have different cognitive values and uses different ‘modes of presentation’ of one object to motivate the distinction between sense and reference. The final paragraph returns to that starting point: if a=b, the two sentences have the same reference, namely the same truth-value, while the sense of b may still differ from that of a and so the thoughts expressed may differ. The card's complete sentence refers back to precisely that condition with ‘In that case.’",
    distinction:
      "原句没有说所有同指表达式必然具有不同认知价值；只有涵义确实不同时，这个结论才成立。涵义也不是说话者任意的私人联想，弗雷格在正文中把可共同把握的涵义与主观“观念”分开。旧卡关于“名称如何给出对象”的宽命题是对全文论证的编辑摘要，并非13词短句的逐字展开。",
    englishDistinction:
      "The sentence does not say that every pair of co-referring expressions must have different cognitive values; the conclusion follows when their senses actually differ. Nor is sense an arbitrary private association, since Frege distinguishes shareable sense from subjective ‘idea.’ The former claim about how a name gives its object is an editorial summary of the article's argument, not wording unpacked by the thirteen-word excerpt alone.",
  },
  quine: {
    context:
      "〈经验主义的两个教条〉第五节末部先拒绝把每个单独陈述的真拆成可独立追踪的语言成分与事实成分，又说罗素已把经验主义检验单位从词推进到陈述，但这张网格仍画得太细。卡片完整句结束第五节；紧接的第六节才以“人造织物”和“力场”比喻说明知识整体在边缘接触经验、冲突会引起内部陈述重新调整。",
    englishContext:
      "Near the end of §V of ‘Two Dogmas of Empiricism,’ Quine rejects the attempt to trace separate linguistic and factual components in the truth of each individual statement. Russell had already moved the empiricist unit from the term to the statement, but Quine says that grid remains too fine. The card's complete sentence closes §V; only the immediately following §VI develops the ‘man-made fabric’ and ‘field of force’ images in which science meets experience at its edges and conflict prompts internal readjustment.",
    distinction:
      "整体论不是说单句永远不能受特定观察强烈支持或反驳，也不是允许遇到反例时任意改动任何信念。第六节仍让经验构成力场的边界条件，并提到保守性与简化等修订倾向。旧卡关于“网络不同位置可修订”的说法来自相邻段落的综合，不能冒充这10词句已经逐字说完的内容。",
    englishDistinction:
      "Holism does not mean that no particular sentence can ever be strongly supported or challenged by a specific observation, nor does it license arbitrary revision anywhere after counterevidence. Section VI still makes experience the field's boundary conditions and invokes tendencies toward conservatism and simplicity. The former card's claim about revising different positions in a network synthesizes the neighboring paragraphs rather than wording already contained in this ten-word sentence.",
  },
  wittgenstein: {
    context:
      "《哲学研究》第40节先区分名称的意义与承载名称的对象，第41—42节再以工具损坏、从未使用过的记号追问一个名称怎样在语言游戏中仍有或获得位置。卡片取第43节的完整句：它只对“我们使用‘意义’一词的一大类情形——虽非全部”给出用法界定，并把词放回具体语言之中。",
    englishContext:
      "Philosophical Investigations §40 first distinguishes the meaning of a name from its bearer, and §§41–42 then use a broken tool and a never-used sign to ask how a name keeps or acquires a place in a language-game. The card takes the complete sentence in §43: it defines meaning by use only for ‘a large class of cases—though not for all’ in which the word is employed, and locates that use in the language.",
    distinction:
      "第43节明说“虽非全部”，所以它不是关于所有意义情形的无例外定义；“使用”也不等于个人临时赋义或多数人的流行频率，更没有把真理降为习惯。旧卡“一个词的意义，常常就在它被使用的方式里”保留为受限定句支持的编辑摘要，不能抹去原句的范围限制。",
    englishDistinction:
      "Section 43 expressly says ‘though not for all,’ so it is not an exceptionless definition of every case of meaning. Nor does ‘use’ mean an individual's momentary stipulation or mere popularity, and it does not reduce truth to habit. The former claim that meaning ‘often lies in the way’ a word is used remains an editorial summary supported by the qualified sentence; it must not erase the qualification.",
  },
  "wittgenstein-language-games": {
    context:
      "《哲学研究》第21节先比较同样的“五块石板”在报告和命令中的不同作用。第23节继而追问句子有多少种，在列出断言、问题与命令之后，以卡片所取的16词完整句回答：符号、词与句子的使用有“数不胜数的种类”。同节随即说明这种多样性并非固定不变，新语言游戏会产生、消失，并以命令、描述、报告、猜测、玩笑和祈祷等活动继续举例。",
    englishContext:
      "Philosophical Investigations §21 first compares the different roles of the same ‘Five slabs’ as report and order. Section 23 then asks how many kinds of sentence there are and, after naming assertion, question, and command, answers in the card's complete sixteen-word sentence that uses of symbols, words, and sentences are ‘countless kinds.’ The same remark immediately says that this multiplicity is not fixed: new language-games arise and others disappear, before continuing with activities such as ordering, describing, reporting, guessing, joking, and praying.",
    distinction:
      "语言游戏不是一份封闭分类表，也不是说每句话只能属于一个互不相通的盒子。第23节强调活动会变化、重叠并被遗忘；理解仍需比较实际用法与可作回应的规则。旧卡列出的命令、请求、叙述、玩笑与祈祷来自本节例表的编辑压缩，并非16词主句逐项列出的内容。",
    englishDistinction:
      "Language-games do not form a closed taxonomy, nor must every utterance occupy one sealed compartment. Section 23 stresses that activities change, overlap, and are forgotten; understanding still requires comparison of actual uses and norms of response. The former list of commanding, requesting, reporting, joking, and praying is an editorial compression of the examples surrounding the sixteen-word excerpt, not a list stated inside it.",
  },
  "wittgenstein-private-diary": {
    context:
      "《哲学研究》第258节设想用“S”在日历中记录一种反复出现的感觉。记录者试图靠集中注意来给记号作私人指示定义，却只能希望未来会把记号与感觉的联系记对；卡片所取完整句由此说“在当前这个情形中，我没有正确性的标准”。同节接着指出，若凡是将来显得正确的都算正确，这里便无法再谈“正确”；第259—265节继续检验规则印象、记忆与独立核对。",
    englishContext:
      "Philosophical Investigations §258 imagines marking a calendar with ‘S’ whenever a recurring sensation occurs. The diarist tries to give the sign a private ostensive definition by concentrating attention, but can only hope to remember the sign–sensation connection correctly in the future. The card's complete sentence therefore says that ‘in the present case I have no criterion of correctness.’ The remark then says that if whatever will seem right counts as right, talk of ‘right’ has lost its grip; §§259–265 continue with impressions of rules, memory, and independent checks.",
    distinction:
      "论证没有否认感觉真实，也没有说独处者不能写日记；它针对的是只有当事人当下印象可充当核对、从而把“自以为正确”当作“正确”的私人记号。旧卡关于感觉记号和记忆核对的完整条件链来自第258节整段，是编辑摘要，不是11词短句中已经逐字包含的结论。",
    englishDistinction:
      "The argument neither denies the reality of sensations nor says that a solitary person cannot keep a diary. Its target is a private sign for which only the subject's present impression can check the entry, collapsing seeming right into being right. The former chain about a sensation-sign and memory checks synthesizes the whole of §258; it is an editorial summary, not wording already contained in the eleven-word excerpt.",
  },
  "wittgenstein-beetle-box": {
    context:
      "《哲学研究》第293节从“我只凭自己的情形知道疼痛是什么意思”转入盒中甲虫的设想：人人有盒子，彼此不能察看，盒中物甚至可以各不相同并不断变化。若“甲虫”仍在这些人的语言中有用，卡片所取完整句说盒中物在语言游戏中根本没有位置，甚至盒子可能为空；随后又说可以把盒中物约去，并把讨论收束到感觉表达的语法。",
    englishContext:
      "Philosophical Investigations §293 moves from the claim that one knows what pain means only from one's own case to the beetle-box scenario: everyone has a box that no one else can inspect, and its contents may differ or change constantly. If ‘beetle’ nevertheless has a use in their language, the card's complete sentence says that the thing in the box has no place in the language-game and that the box might even be empty. Wittgenstein then says the item can be ‘divided through’ and returns the discussion to the grammar of sensation-expression.",
    distinction:
      "盒中物被排除的是作为公共词义之隐藏决定者的角色，不是疼痛或内在经验的存在；论证也没有证明人人感受相同。旧卡“无法独自决定公共词语的意义”是这段比喻的编辑摘要；主句更精确地说，在所设语言游戏中，那个不可比较的对象没有位置。",
    englishDistinction:
      "What drops out is the hidden item's role as determinant of a public word's meaning, not the existence of pain or inner experience; the argument does not prove that everyone feels alike. The former claim that private contents cannot by themselves determine public meaning is an editorial summary of the image. The excerpt more precisely says that, in the imagined language-game, the uncheckable object has no place.",
  },
  "wittgenstein-aspect-seeing": {
    context:
      "《哲学研究》第二部第xi节先区分“你在那里看见什么？”与“我看见这两张脸相似”两种“看见”。随后维特根斯坦设想凝视一张脸并突然注意到它像另一张脸；卡片取同一段中“它没有改变，而我看得不同”的完整句，下一句把这种经验称为“注意到一个面向”。文本紧接着把重点从心理原因移到这个概念在经验概念中的位置，后文再展开图形的多重面向与鸭兔图。",
    englishContext:
      "Part II, xi of Philosophical Investigations first distinguishes ‘What do you see there?’ from ‘I see a likeness between these two faces’ as two uses of ‘see.’ Wittgenstein then imagines contemplating one face and suddenly noticing its likeness to another. The card takes the complete sentence in that paragraph saying that it has not changed and yet is seen differently; the next sentence calls this experience ‘noticing an aspect.’ The text immediately shifts interest from psychological causes to the concept's place among concepts of experience, and later develops changing aspects and the duck-rabbit.",
    distinction:
      "“看得不同”不是断言图形物理改变，也不是说观看者可以随意投射任何解释。面向能否被看见受图形、熟悉度、概念与可表达反应共同约束。旧卡关于“突然看见另一面”和“概念能力塑造看见”综合了本节后续讨论；13词主句本身只把不变与看法改变并置。",
    englishDistinction:
      "Seeing differently does not say that the figure physically changes, nor that a viewer may project any interpretation at will. What can be seen as an aspect is constrained by the figure, familiarity, concepts, and expressible responses. The former claim about another aspect dawning and conceptual capacities shaping sight synthesizes the later discussion; the thirteen-word excerpt itself only juxtaposes an unchanged object with changed seeing.",
  },
  "wittgenstein-doubt-background": {
    context:
      "《论确实性》第114节说，若对任何事实都不确定，也无法确定自己词语的意义；第115节先指出试图怀疑一切的人甚至无法走到怀疑任何事，随后以卡片所取7词末句概括：怀疑的游戏本身预设确定性。第116—125节继续以“对我稳固”、怀疑如何在实践中显现、怀疑是否需要根据以及作为判断原则的判断，说明这种背景怎样工作。",
    englishContext:
      "On Certainty §114 says that if one is certain of no fact, one cannot be certain of the meanings of one's words either. Section 115 first says that an attempt to doubt everything would not get as far as doubting anything, then closes with the card's seven-word sentence: the game of doubting itself presupposes certainty. Sections 116–125 continue with what stands fast, how doubt would show itself in practice, whether doubt needs grounds, and judgments used as principles of judgment.",
    distinction:
      "这句话不禁止具体怀疑，也没有把某一份命题清单宣布为永远免疫于修正；它说明怀疑要能成为可辨认、可检验的行动，必须有当下未同时撤销的意义、判断和实践背景。旧卡关于“被信任的判断方式”是结合第114—125节写成的编辑摘要，而不是7词短句中的额外术语。",
    englishDistinction:
      "The sentence does not forbid particular doubts or declare one list of propositions permanently immune to revision. It says that for doubt to be a recognizable, testable move, meanings, judgments, and practices cannot all be withdrawn at once. The former reference to trusted methods of judgment is an editorial summary drawn from §§114–125, not additional terminology in the seven-word excerpt.",
  },
  "wittgenstein-fly-bottle": {
    context:
      "《哲学研究》第304节拒绝把感觉说成“一个虚无”，并指出真正被拒绝的是强迫我们那样说的语法；第308节又追查关于内在过程和行为主义的哲学问题如何由一种看法的第一步产生。第309节随即以卡片完整保留的问答提出治疗性意象：哲学的目标是给苍蝇指出飞出捕蝇瓶的路。第109节关于不提出理论、让解释止步而以描述取代，也构成旧卡宽命题的另一文本依据。",
    englishContext:
      "Philosophical Investigations §304 refuses to call sensation ‘a nothing’ and says that what has been rejected is the grammar that forces that picture on us. Section 308 then traces how the philosophical problem about inner processes and behaviourism begins with an unnoticed first step in a way of looking. Section 309 follows with the card's complete question-and-answer image: philosophy aims to shew the fly the way out of the fly-bottle. Section 109's rejection of theories and demand that explanation stop in favor of description supplies the other textual basis for the former broader claim.",
    distinction:
      "捕蝇瓶比喻不是说一切哲学工作都没有论证，也没有承诺一条适用于所有困惑的固定逃生路线；它刻画的是解除由语法和图像造成的受困状态。旧卡“不建造新理论”“被语言困住”分别综合第109节及第304—309节，不能冒充16词问答已逐字包含全部方法论。",
    englishDistinction:
      "The fly-bottle image neither says that all philosophy lacks argument nor promises one fixed escape route for every confusion. It depicts release from captivity to grammar and pictures. The former phrases about building no new theory and being trapped by language synthesize §109 and §§304–309 respectively; they are not all wording contained in the sixteen-word question and answer.",
  },
  "wittgenstein-lion": {
    context:
      "《哲学研究》第二部第xi节在卡片前设想人来到传统完全陌生的国度：即使掌握当地语言，仍无法理解那里的人，因为无法在其生活中找到立足点。文本继而说明“我无法知道他内在发生什么”首先是一幅令人信服的图像，却没有给出信念的理由；卡片所取10词完整句“如果一头狮子会说话，我们也无法理解它”就在这段之后。",
    englishContext:
      "Immediately before the card in Part II, xi of Philosophical Investigations, Wittgenstein imagines entering a country with entirely strange traditions: even mastery of its language may leave us unable to understand the people because we cannot find our feet with them. The text then says that ‘I cannot know what is going on in him’ is first of all a compelling picture rather than a statement of reasons. The card's complete ten-word sentence—‘If a lion could talk, we could not understand him’—follows this discussion.",
    distinction:
      "狮子句不是简单说缺少双语词典，也不是证明动物没有心灵、经验或一切跨物种理解都不可能。难题在于词语嵌入完全不同的身体、行动、环境与生活常规后，人类听者无法“找到立足点”。旧卡以“未必”和“生活形式”把这条绝对条件句转成较宽、较谨慎的编辑摘要。",
    englishDistinction:
      "The lion sentence is not merely about lacking a bilingual dictionary, and it does not prove that animals lack minds or experience or that every kind of cross-species understanding is impossible. The difficulty is that words embedded in radically different bodies, actions, environments, and routines may leave human hearers unable to ‘find their feet.’ The former card's ‘might’ and appeal to forms of life turn the absolute conditional into a broader, more cautious editorial summary.",
  },
  "wittgenstein-family-resemblance": {
    context:
      "《哲学研究》第65节以“游戏”追问一个名称之下是否必须有所有实例共有的东西。第66节依次察看棋类、球类、耐心牌与儿童抛球等活动，发现特征不断出现又消失；卡片所取完整句正是这番考察的结论。第67节随后把这种重叠交错命名为“家族相似”，并以纤维相互搭接而成的线作进一步比喻。",
    englishContext:
      "Philosophical Investigations §65 asks, through the example of games, whether everything called by one name must share a single common feature. Section 66 surveys board games, ball-games, patience, and a child's throwing a ball, watching features appear and disappear; the card's complete sentence states the result of that examination. Section 67 then names the overlapping and criss-crossing pattern ‘family resemblances’ and develops the image of a thread strengthened by overlapping fibres.",
    distinction:
      "家族相似并不证明任何概念都不可能有定义或明确边界。第68—69节明说人可以为特定目的画出边界，问题在于实际使用未必预先依赖一条覆盖所有实例的本质。旧卡把“游戏”的考察推广为关于概念成员的一般命题，是受文本支持的编辑摘要；它不是一套可自动替代分类论证的算法。",
    englishDistinction:
      "Family resemblance does not prove that no concept can have a definition or sharp boundary. Sections 68–69 expressly allow boundaries to be drawn for particular purposes; the point is that actual use need not already depend on one essence shared by every instance. The former general claim about members of a concept is a text-supported editorial summary of the games discussion, not an algorithm that automatically replaces classificatory argument.",
  },
  "wittgenstein-rule-practice": {
    context:
      "《哲学研究》第198节说解释本身仍悬在空中，不能独自决定意义，并把路标能引导行动放回训练、规律使用与习俗。第199节把遵守规则、报告、命令与下棋称为习俗、用法或制度；第201节再解除“任何行动都可被解释为符合规则”的悖论。卡片所取第202节首句由此得出“遵守规则”是一种实践，后两句随即区分遵守与自以为遵守。",
    englishContext:
      "Philosophical Investigations §198 says that an interpretation still hangs in the air and cannot determine meaning by itself, locating a sign-post's guidance instead in training, regular use, and custom. Section 199 calls obeying a rule, reporting, commanding, and playing chess customs, uses, or institutions; §201 then dissolves the paradox that any action can be interpreted as according with a rule. The card takes the opening sentence of §202, after which two further sentences distinguish obeying from merely thinking one is obeying.",
    distinction:
      "“实践”不等于多数表决即可制造正确，也不把规范还原为重复行为的因果习惯；重点是存在可学习、可继续、可区分符合与违背的用法。第202节的“不能私下遵守”针对的是把自以为正确当成正确标准，并非否认一个人可以独处时按规则行动。旧卡的“共享实践”来自前后数节，而不是9词短句中的额外原词。",
    englishDistinction:
      "“Practice” neither means that a majority vote creates correctness nor reduces normativity to causal repetition. The point is a use that can be learned and continued and in which accord can be distinguished from conflict. Section 202's impossibility of obeying ‘privately’ targets making seeming right the criterion of being right; it does not deny that someone can follow a rule while physically alone. The former phrase ‘shared practice’ comes from the surrounding remarks, not additional wording in the nine-word excerpt.",
  },
  "wittgenstein-hinge-certainty": {
    context:
      "《论确实性》第341节先说，我们提出的问题与怀疑依赖某些命题被排除在怀疑之外，它们如同问题与怀疑转动其上的铰链；第342节把某些事情在实际中不受怀疑称为科学探究逻辑的一部分。第343节又否认这只是因为人无法调查一切而被迫满足于假设，随后以卡片所取的末句收束铰链比喻。",
    englishContext:
      "On Certainty §341 first says that our questions and doubts depend on some propositions being exempt from doubt, like hinges on which those questions and doubts turn. Section 342 calls certain things not being doubted in deed part of the logic of scientific investigations. Section 343 then denies that this is merely a forced assumption caused by our inability to investigate everything and closes with the sentence selected for the card.",
    distinction:
      "铰链比喻没有列出一套永恒不变、对所有探究都相同的公理，也没有说这些确信因拥有最高等级证据而站稳。它说明提问、怀疑与举证在具体实践中需要某些东西暂时保持不动；哪些命题承担这个角色及其能否在别处改变，仍须看更广文本与实践。把它直接用来诊断任何争论的“隐藏前提”是项目延伸。",
    englishDistinction:
      "The hinge image does not list an eternal, inquiry-independent set of axioms, nor does it say that these certainties stand fast because they possess the highest grade of evidence. It says that questioning, doubting, and giving reasons require some things to remain fixed within a practice; which propositions play that role, and whether they can change elsewhere, requires the wider text and practice. Using the image directly to diagnose the ‘hidden premises’ of any dispute is a project extension.",
  },
  "chinese-confucius-rectifying-names": {
    context:
      "《论语》13.3 中，子路问卫君待孔子而为政将先做什么，孔子答以“正名”，并由名不正推演到言不顺、事不成、礼乐与刑罚失序。这里的名与政治角色、制度职责相连，语言秩序直接关系公共行动能否获得共同准绳。",
    englishContext:
      "In Analects 13.3, Zilu asks what Confucius would do first if entrusted with governing Wei. Confucius answers by rectifying names, then traces how incorrect names lead to disorder in speech, affairs, rites, music, and punishment. Names here are tied to political roles and institutional duties, so linguistic order bears directly on shared standards for public action.",
    distinction:
      "正名不是要求所有人接受单一措辞，也不只是给旧等级背书。它追问称谓是否与事实、权限和责任相称；若只修饰名称而不校正实际行为，恰恰违背名实相副的要求。",
    englishDistinction:
      "Rectifying names neither demands one compulsory vocabulary nor merely endorses inherited hierarchy. It asks whether titles correspond to facts, authority, and responsibility; polishing labels without correcting conduct would itself violate the demand that names and realities match.",
  },
  "chinese-mencius-nature-good": {
    context:
      "《孟子》6A.2 以水趋下回应告子“人性无分于善不善”的主张。孟子承认外力能迫使水向上，也承认人会为不善，却据此区分自然倾向与受环境扭曲后的结果；性善说因此与善端的保存、扩充和政治条件相连。",
    englishContext:
      "Mencius 6A.2 answers Gaozi's claim that human nature is indifferent to good and bad through the image of water tending downward. Mencius concedes that force can drive water upward and that people can do wrong, but distinguishes a natural tendency from outcomes distorted by conditions. The goodness of human nature is therefore linked to nurturing moral sprouts and to political conditions.",
    distinction:
      "性善不是说人出生时已拥有完备德性，也不是说每个欲望和行为都善。它指向可发展的道德趋向；趋向可能受损，必须通过反省、教养与制度支持才成为稳定品格。",
    englishDistinction:
      "Good human nature does not mean that people are born with complete virtue or that every desire and act is good. It names a developable moral tendency that can be damaged and requires reflection, cultivation, and institutional support to become stable character.",
  },
  "chinese-laozi-noncoercive-order": {
    context:
      "《道德经》第三十七章以“道常无为而无不为”说明生成秩序并不依靠持续强制，并把这一思路转入侯王治理：能守道则万物自化，欲望再起时以无名之朴加以镇定。重点在限制权力的妄作，让变化保有自身条件。",
    englishContext:
      "Daodejing chapter 37 says that the Way is constantly nonacting yet leaves nothing undone, presenting an order of generation that does not depend on continuous coercion. Applied to rulers, preserving the Way lets things transform of themselves, while the nameless uncarved block stills rising desire. The emphasis is on restraining intrusive power so change can retain its own conditions.",
    distinction:
      "无为不是袖手旁观，也不是放任强者支配弱者。它反对自负、过量和违背事物节律的干预；为了减少强制而采取的节制、修复和必要行动，并不与无为矛盾。",
    englishDistinction:
      "Nonaction is neither standing by nor allowing the strong to dominate the weak. It opposes self-important, excessive intervention that violates a process's rhythm; restrained, reparative, and necessary action aimed at reducing coercion is not inconsistent with nonaction.",
  },
  "chinese-zhuangzi-butterfly-dream": {
    context:
      "蝴蝶梦位于《庄子·齐物论》结尾：庄周梦为蝴蝶时不知有周，醒后又成为庄周，文本随后追问周与蝶必有分，却又称之为“物化”。它把全篇关于彼此、是非和视角转换的讨论落到自我身份与经验边界上。",
    englishContext:
      "The butterfly dream closes the Zhuangzi's Discussion on Making All Things Equal. While dreaming, Zhuang Zhou does not know Zhou; after waking, he is Zhou again. The text says there must be a distinction between Zhou and butterfly, yet calls the transition the transformation of things, bringing the chapter's shifts of perspective to bear on identity and experience.",
    distinction:
      "蝴蝶梦没有简单断言清醒世界是幻觉，也不取消周与蝶的差别。它质疑的是我们凭单一状态获得的绝对确信，并让身份在差异仍存的情况下被理解为可转化的过程。",
    englishDistinction:
      "The dream does not simply declare waking life an illusion or erase the difference between Zhou and butterfly. It questions absolute certainty derived from a single state and presents identity as a transformable process in which distinctions still remain.",
  },
  "chinese-gongsun-long-white-horse": {
    context:
      "《公孙龙子·白马论》以问答反复检验“白马非马”：求马时黄黑马皆可，求白马则颜色条件排除了它们。论证把具体对象、颜色性质以及名称所划定的范围分开，显示增加限定语会改变一个名称在论辩中的所指。",
    englishContext:
      "The Discourse on the White Horse repeatedly tests the claim that a white horse is not a horse through dialogue: when one requests a horse, yellow and black horses qualify, whereas requesting a white horse excludes them by color. The argument separates concrete objects, color properties, and the ranges set by names, showing how a qualifier changes reference in debate.",
    distinction:
      "“白马非马”不是否认白马属于马类，也不能直接等同于现代集合论命题。它利用古代名辩语境考察名称与限定条件；评价论证时须先说明“非”指同一、包含还是所指范围不同。",
    englishDistinction:
      "A white horse is not a horse does not simply deny that white horses belong to the class of horses, nor can it be translated directly into modern set theory. In the ancient context of names and disputation, assessment depends on whether not means nonidentity, noninclusion, or a difference in reference.",
  },
  "chinese-xunzi-transforming-nature": {
    context:
      "《荀子·性恶》开篇以“其善者伪也”区分自然资质与后天人为。荀子认为顺任欲求会产生争夺，礼义则由圣人积累思虑、制度和训练而成；人的善并非自然自行展开，而是在学习与共同规范中改造出来。",
    englishContext:
      "The opening of Xunzi's Human Nature Is Bad distinguishes natural endowment from deliberate human activity in the phrase that goodness is wei. Xunzi argues that unchecked desires produce contention, while ritual and rightness are formed through accumulated reflection, institutions, and training; goodness is fashioned through learning and shared norms rather than unfolding automatically.",
    distinction:
      "这里的“伪”是有意识的制作与实践，不是虚假伪装；“性恶”也不等于人具有不可改变的邪恶本质。恰因自然起点不足，教育、礼义和制度塑造才具有决定意义。",
    englishDistinction:
      "Wei here means conscious making and practice, not deceitful pretense; bad nature does not mean an immutable essence of evil. Precisely because natural beginnings are insufficient, education, ritual, and institutional formation become decisive.",
  },
  "chinese-han-feizi-two-handles": {
    context:
      "《韩非子·二柄》开篇把刑与德，即惩罚与奖赏，称为君主驾驭臣下的两种权柄。篇章关心的不是臣下口头动机，而是权柄由谁掌握、行为与名责是否核验，以及赏罚外借后怎样使君主失去制度控制。",
    englishContext:
      "The opening of Han Feizi's The Two Handles calls punishment and favor the two powers by which a ruler controls ministers. Its concern is not ministers' professed motives but who controls these powers, whether conduct is checked against assigned claims and duties, and how delegating reward and punishment causes the ruler to lose institutional control.",
    distinction:
      "理解二柄的机制不等于认可专制统治，也不能把它简化成一般管理技巧。韩非讨论的是高度集中的权力结构；现代借鉴必须同时追问监督、申诉与赏罚者本身受何种约束。",
    englishDistinction:
      "Understanding the mechanism of the two handles does not endorse autocratic rule or reduce the text to generic management advice. Han Feizi analyzes highly concentrated power; any modern application must also ask about oversight, appeal, and constraints on those who reward and punish.",
  },
  "chinese-wang-bi-forgetting-image": {
    context:
      "王弼《周易略例·明象》用言、象、意的层次解释经典理解：言用来明象，象用来存意；既已把握所指，便不应执着于传达工具。所谓忘言忘象建立在先经由言象得意之上，是对媒介功能的反省。",
    englishContext:
      "In Clarifying the Images, Wang Bi explains interpretation through the levels of words, images, and meaning: words disclose images, and images preserve meaning. Once their referent is grasped, the vehicle should not become an object of attachment. Forgetting words and images therefore follows attaining meaning through them and reflects on the function of media.",
    distinction:
      "得意忘象不是绕过文本追求私人灵感，更不是说表达形式无关紧要。能否说明言象如何引向所理解的意义，仍是检验解读的条件；“忘”针对执著，不是删除证据。",
    englishDistinction:
      "Forgetting the image does not bypass the text in pursuit of private inspiration or make expressive form irrelevant. An interpretation must still explain how words and images lead to its meaning; forgetting targets attachment, not the removal of evidence.",
  },
  "chinese-sengzhao-dependent-and-empty": {
    context:
      "《肇论·不真空论》以“待缘而有”反驳事物拥有独立常住自性的设想。僧肇同时保留现象的作用与空性：万物依条件而呈现，故不能说绝对没有；又因无法自立、随缘变化，故不能把经验中的有当作不变的真有。",
    englishContext:
      "In The Emptiness of the Unreal, Sengzhao uses arising in dependence on conditions to reject the idea that things possess an independent, enduring self-nature. He preserves both their phenomenal efficacy and emptiness: conditioned things cannot be called sheer nothing, yet because they do not stand alone and change with conditions, their experienced existence is not absolute being.",
    distinction:
      "“空”否定的是自足不变的本质，不是否定世界、因果或痛苦的作用。缘起与空不是两套相反判断：正因为事物依缘而有，它们才既能产生真实影响，又没有孤立恒常的核心。",
    englishDistinction:
      "Emptiness denies a self-sufficient, unchanging essence, not the world or the efficacy of causation and suffering. Dependent arising and emptiness are not opposing claims: because things exist through conditions, they can have real effects without possessing an isolated, permanent core.",
  },
  "chinese-wang-yangming-knowledge-action": {
    context:
      "《传习录上》徐爱所记问答针对把知与行分作两截的学习观。王阳明说知是行的主意、行是知的功夫，并以知痛、知寒等经验说明真正的知已经落实于回应；道德学习因而要在行动中完成并验证。",
    englishContext:
      "In Xu Ai's record in Part I of Instructions for Practical Living, Wang Yangming challenges an approach to learning that splits knowing from acting. He calls knowing the direction of action and acting the work of knowing, using experiences such as knowing pain or cold to show that genuine knowing is realized in response; moral learning is completed and tested in action.",
    distinction:
      "知行合一不是否认学习、思考与行动在时间上可有先后，也不是要求未经判断便立即去做。它反对的是以口头赞同冒充道德知识：若理解始终不能改变选择，其“知”尚未完成。",
    englishDistinction:
      "The unity of knowing and acting does not deny that study, reflection, and action can occur in sequence, nor does it demand acting without judgment. It rejects verbal assent masquerading as moral knowledge: if understanding never changes choice, that knowing remains incomplete.",
  },
};
