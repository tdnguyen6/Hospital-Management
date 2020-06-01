<?php
require_once __DIR__."/MedicalStaff.php";
require_once __DIR__."/Visit.php";
require_once __DIR__."/PrescriptionMedicine.php";
require_once __DIR__ . "/Room.php";
require_once __DIR__ . "/Prescription.php";
require_once __DIR__ . "/MedicalService.php";
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class Prescription
{
    protected EntityManager $entityManager;

    /**
     * @param EntityManager $entityManager
     */
    public function setEntityManager(EntityManager $entityManager): void
    {
        $this->entityManager = $entityManager;
    }
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private $id;
    /**
     * @ORM\Column(type="integer")
     */
    private $totalCost;
    /**
     * @ORM\Column(type="integer")
     */
    private $prescribeFor;
    /**
     * @ORM\ManyToOne(targetEntity="MedicalStaff", inversedBy="prescribedPrescriptions")
     */
    private $prescribedBy;
    /**
     * Many Prescriptions Include Many Medicines
     * @ORM\OneToMany(targetEntity="PrescriptionMedicine", mappedBy="prescription")
     */
    private $prescriptionMedicines;

    public function __construct()
    {
        $this->prescriptionMedicines = new ArrayCollection();
    }

    /**
     * Get the value of id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of prescribedBy
     */
    public function getPrescribedBy()
    {
        return $this->prescribedBy;
    }

    /**
     * Set the value of prescribedBy
     *
     * @return  self
     */
    public function setPrescribedBy(int $prescribedBy)
    {
        $StaffObj = $this->entityManager->find('MedicalStaff', $prescribedBy);
        $this->prescribedBy = $StaffObj;

        return $this;
    }

    /**
     * Get the value of prescribeFor
     */
    public function getPrescribeFor()
    {
        return $this->prescribeFor;
    }

    /**
     * Set the value of prescribeFor
     *
     * @param int $prescribeFor
     * @return  self
     */
    public function setPrescribeFor(int $prescribeFor)
    {
        $VisitObj = $this->entityManager->find('Visit', $prescribeFor);
        $this->prescribeFor = $VisitObj;

        return $this;
    }

    /**
     * Get many Prescriptions Include Many Medicines
     */
    public function getPrescriptionMedicines()
    {
        return $this->prescriptionMedicines;
    }

    /**
     * Set many Prescriptions Include Many Medicines
     *
     * @return  self
     */
    public function setPrescriptionMedicines($prescriptionMedicines)
    {
        $this->prescriptionMedicines = $prescriptionMedicines;

        return $this;
    }

    /**
     * Get the value of totalCost
     */
    public function getTotalCost()
    {
        return $this->totalCost;
    }

    /**
     * Set the value of totalCost
     *
     * @return  self
     */
    public function setTotalCost($totalCost)
    {
        $this->totalCost = $totalCost;

        return $this;
    }

    public function get () {
        return [
            "id" => $this->getId(),
            "totalCost" => $this->getTotalCost(),
            "prescribedFor" => $this->getPrescribeFor(),
            "prescribedBy" => $this->getPrescribedBy()->getId()
        ];
    }

    public static function validate(array $fields): bool
    {
        if (count($fields) === 3
            && array_key_exists("totalCost", $fields)
            && array_key_exists("prescribedBy", $fields)
            && array_key_exists("prescribeFor", $fields)
            && $fields["totalCost"] !== ""
            && $fields["prescribedBy"] !== ""
            && $fields["prescribeFor"] !== ""
        ) {
            return true;
        }
        return false;
    }

    public static function getKeys() {
        return ["id"];
    }
}